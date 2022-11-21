let logotype = function logotype() {
  if (process.env.LOGOTYPE_URI) {
    return process.env.LOGOTYPE_URI;
  }
  return "https://www.kth.se/polopoly_fs/1.77257!/KTH_Logotyp_RGB_2013-2.svg";
};

const applicationInsights = () => {
  if (!process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    return "";
  }

  return `
        <script>
          var appInsights=window.appInsights||function(a){
              function b(a){c[a]=function(){var b=arguments;c.queue.push(function(){c[a].apply(c,b)})}}var c={config:a},d=document,e=window;setTimeout(function(){var b=d.createElement("script");b.src=a.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",d.getElementsByTagName("script")[0].parentNode.appendChild(b)});try{c.cookie=d.cookie}catch(a){}c.queue=[];for(var f=["Event","Exception","Metric","PageView","Trace","Dependency"];f.length;)b("track"+f.pop());if(b("setAuthenticatedUserContext"),b("clearAuthenticatedUserContext"),b("startTrackEvent"),b("stopTrackEvent"),b("startTrackPage"),b("stopTrackPage"),b("flush"),!a.disableExceptionTracking){f="onerror",b("_"+f);var g=e[f];e[f]=function(a,b,d,e,h){var i=g&&g(a,b,d,e,h);return!0!==i&&c["_"+f](a,b,d,e,h),i}}return c
          }({
              instrumentationKey: "${process.env.APPINSIGHTS_INSTRUMENTATIONKEY}"
          });      
          window.appInsights=appInsights,appInsights.queue&&0===appInsights.queue.length&&appInsights.trackPageView();
        </script>
        `;
};

const css = function css() {
  if (process.env.CSS_URI) {
    return `<link rel="stylesheet" href="${process.env.CSS_URI}" />`;
  }
  return `<!-- Default style. -->
  <link rel="stylesheet" href="https://www.kth.se/css/kth-5f5f79eef475004fee82bae5a9864d82.css" />
  <style>
  .main.container {
    padding-top: 15px;
  }
   @media (min-width: 768px) {
      html, body {
        height: 100%;
      }
      .header-container__top {
        margin-bottom: 19px;
      }
      .main.container {
        min-height: calc(100% - 212px);
        padding-top: 0;
      }
      .main.container .app {
        padding: 30px;
      }
    }
</style>`;
};

/**
 * Module exports
 */
module.exports = {
  logotype: logotype,
  applicationInsights: applicationInsights,
  css: css,
};
