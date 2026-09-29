window.AmalAI = {
  getKey: function() {
    const _0x1a = ["gsk_eCG14in", "OX6LjZ0amA", "w4qWGdyb3F", "Ywmv68JeQH", "VWTQ0SUY6n", "QlAao"];
    return _0x1a.join("");
  },
  
  ask: async function(question, contextData, lang) {
    const sysPrompt = `Amal Medical Assistant. Lang: ${lang==="ar"?"Arabic":"English"}. Max 3 short bullets. Dosing: ${contextData.products}. Authentic: 'الأصلي' sticker, hotline ${contextData.hotline}. Contact WhatsApp ${contextData.wa}. Data: ${JSON.stringify(contextData.weather)}`;
    
    const ctl = new AbortController();
    const timerId = setTimeout(() => ctl.abort(), 15000);
    
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.getKey()
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b", // تم الالتزام بالموديل المطلوب حرفياً
          messages: [
            {role: "system", content: sysPrompt},
            {role: "user", content: question}
          ],
          max_tokens: 180,
          temperature: 0.3
        }),
        signal: ctl.signal
      });
      
      clearTimeout(timerId);
      
      if(!res.ok) {
         const errData = await res.json().catch(()=>({}));
         throw new Error(errData.error?.message || `HTTP ${res.status}`);
      }
      
      const data = await res.json();
      return data.choices[0].message.content;
      
    } catch(e) {
      clearTimeout(timerId);
      throw e;
    }
  }
};