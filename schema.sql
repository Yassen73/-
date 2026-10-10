-- شغّله مرة واحدة في Supabase > SQL Editor
create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student','parent','teacher','admin')),
  full_name text not null check (char_length(full_name) between 3 and 80),
  phone text not null unique check (phone ~ '^01[0125][0-9]{8}$'),
  grade text,
  parent_phone text check (parent_phone is null or parent_phone ~ '^01[0125][0-9]{8}$'),
  created_at timestamptz not null default now()
);
create table if not exists public.parent_links(
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','approved')),
  created_at timestamptz not null default now(),
  primary key(parent_id,student_id)
);
alter table public.profiles enable row level security;
alter table public.parent_links enable row level security;

-- صلاحيات الأعمدة: المستخدم مايقدرش يغيّر role ولا phone ولا يعمل insert/delete
revoke all on public.profiles, public.parent_links from anon, authenticated;
grant select on public.profiles, public.parent_links to authenticated;
grant update(full_name) on public.profiles to authenticated;
grant update(status) on public.parent_links to authenticated;

drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles for select to authenticated using (id=(select auth.uid()));
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update to authenticated using (id=(select auth.uid())) with check (id=(select auth.uid()));
drop policy if exists "linked parent reads student" on public.profiles;
create policy "linked parent reads student" on public.profiles for select to authenticated using (
  exists(select 1 from public.parent_links l where l.parent_id=(select auth.uid()) and l.student_id=profiles.id and l.status='approved'));

drop policy if exists "link parties read" on public.parent_links;
create policy "link parties read" on public.parent_links for select to authenticated using (parent_id=(select auth.uid()) or student_id=(select auth.uid()));
drop policy if exists "student approves" on public.parent_links;
create policy "student approves" on public.parent_links for update to authenticated using (student_id=(select auth.uid())) with check (student_id=(select auth.uid()));

-- إنشاء البروفايل من السيرفر (مش من المتصفح). الـ role بيتقبل student/parent بس، admin مستحيل من التسجيل.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path='' as $$
declare m jsonb:=new.raw_user_meta_data; r text:=m->>'role'; sid uuid; sp text;
begin
  if r not in ('student','parent') then raise exception 'invalid role'; end if;
  if new.email is distinct from (m->>'phone')||'@phone.ibnrushdy.app' then raise exception 'invalid phone'; end if;
  if r='student' and (m->>'grade') not in ('الصف الرابع الابتدائي','الصف الخامس الابتدائي','الصف السادس الابتدائي','الصف الأول الإعدادي','الصف الثاني الإعدادي','الصف الثالث الإعدادي','الصف الأول الثانوي','الصف الثاني الثانوي','الصف الثالث الثانوي') then raise exception 'invalid grade'; end if;
  insert into public.profiles(id,role,full_name,phone,grade,parent_phone)
  values(new.id,r,trim(m->>'full_name'),m->>'phone',
         case when r='student' then m->>'grade' end,
         case when r='student' then m->>'parent_phone' end);
  if r='parent' then
    select p.id,p.parent_phone into sid,sp from public.profiles p where p.role='student' and p.phone=m->>'student_phone';
    if sid is not null then
      insert into public.parent_links(parent_id,student_id,status)
      values(new.id,sid,case when sp=m->>'phone' then 'approved' else 'pending' end);
    end if;
  end if;
  return new;
end $$;
revoke execute on function public.handle_new_user() from public,anon,authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
