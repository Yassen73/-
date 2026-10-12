function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  if (d.key !== 'ضع_هنا_نفس_كلمة_السر') return ContentService.createTextOutput('forbidden');
  MailApp.sendEmail({ to: d.to, subject: d.subject, htmlBody: d.html, name: 'منصة ابن رشدي' });
  return ContentService.createTextOutput('ok');
}
