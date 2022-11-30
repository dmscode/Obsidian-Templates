<%*
  const content = await tp.file.selection()
  tR += content.replace(/\d{4}(-\d{2}){2}/g, tp.date.now('YYYY-MM-DD'))
                .replace(/\d{4}(\/\d{2}){2}/g, tp.date.now('YYYY/MM/DD'))
                .replace(/\d{2}(:\d{2}){2}/g, tp.date.now('HH:mm:ss'))
%>