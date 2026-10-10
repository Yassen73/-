-- شغّله بعد schema.sql في Supabase > SQL Editor
create table if not exists public.courses(
  id uuid primary key default gen_random_uuid(),
  title text not null, description text, grade text not null,
  emoji text default '📘', price numeric not null default 0, lessons_count int not null default 0,
  is_published boolean not null default false, created_at timestamptz not null default now());
create table if not exists public.enrollments(
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(), primary key(student_id,course_id));
create table if not exists public.support_tickets(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  subject text not null check(char_length(subject) between 3 and 100),
  message text not null check(char_length(message) between 5 and 1000),
  status text not null default 'open' check(status in ('open','closed')),
  created_at timestamptz not null default now());
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.support_tickets enable row level security;
revoke all on public.courses,public.enrollments,public.support_tickets from anon,authenticated;
grant select on public.courses,public.enrollments,public.support_tickets to authenticated;
grant insert(subject,message) on public.support_tickets to authenticated;

create policy "courses read" on public.courses for select to authenticated using(is_published);
create policy "own enrollments" on public.enrollments for select to authenticated using(student_id=(select auth.uid()));
create policy "parent reads child enrollments" on public.enrollments for select to authenticated using(
  exists(select 1 from public.parent_links l where l.parent_id=(select auth.uid()) and l.student_id=enrollments.student_id and l.status='approved'));
create policy "own tickets read" on public.support_tickets for select to authenticated using(user_id=(select auth.uid()));
create policy "own tickets insert" on public.support_tickets for insert to authenticated with check(user_id=(select auth.uid()));
-- الطالب يشوف اسم ولي الأمر اللي طالب الربط معاه
create policy "student reads linked parent" on public.profiles for select to authenticated using(
  exists(select 1 from public.parent_links l where l.student_id=(select auth.uid()) and l.parent_id=profiles.id));

-- كورسات تجريبية (امسحها أو عدّلها)
insert into public.courses(title,description,grade,emoji,price,lessons_count,is_published) values
('النحو من الصفر','قواعد النحو الأساسية بأسلوب مبسّط وتدريبات بعد كل درس.','الصف الأول الثانوي','📗',250,24,true),
('البلاغة والأدب','شرح النصوص والبلاغة مع نماذج امتحانات.','الصف الأول الثانوي','📜',300,30,true),
('مراجعة نهائية','مراجعة شاملة قبل الامتحان.','الصف الثالث الثانوي','🎯',400,18,true);
-- لتسجيل طالب في كورس يدويًا لحد ما الدفع يتجهز:
-- insert into public.enrollments(student_id,course_id) values('<user id من profiles>','<course id>');
