// Google Apps Script: بيبعت الإيميلات من حساب جيميل المنصة.
// المفتاح السري بيتقرأ من Script properties (مش مكتوب في الكود):
// Project Settings > Script properties > أضف MAIL_KEY بنفس القيمة اللي في الـ Edge Function.
// بعد أي تعديل: Deploy > Manage deployments > Edit > New version.
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var key = PropertiesService.getScriptProperties().getProperty('MAIL_KEY');
    if (!key || d.key !== key) return ContentService.createTextOutput('forbidden');
    var to = String(d.to || ''), subject = String(d.subject || ''), html = String(d.html || '');
    if (to.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to)) return ContentService.createTextOutput('bad_to');
    if (!subject || subject.length > 150 || !html || html.length > 20000) return ContentService.createTextOutput('bad_body');
    if (MailApp.getRemainingDailyQuota() < 1) return ContentService.createTextOutput('quota');
    MailApp.sendEmail({ to: to, subject: subject, htmlBody: html, name: 'منصة ابن رشدي' });
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  }
}
