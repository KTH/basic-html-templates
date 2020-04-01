let logotype = function logotype() {
  if (process.env.LOGOTYPE_URI) {
    return process.env.LOGOTYPE_URI;
  }
  return "https://www.kth.se/polopoly_fs/1.77257!/KTH_Logotyp_RGB_2013-2.svg";
};

const applicationInsights = () => {
  if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY == null) {
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

  return `
      <!-- Default style. -->
      <!-- Override by proces.env.CSS_URI='https://example.com/my.css'
      <style>
        body {
            background-color: #e3e5e3;
            margin: 0;
            font-family: Arial,Helvetica Neue,helvetica,sans-serif;
            font-weight: 400;
            line-height: 1.4375;
            font-size: 1.2rem;
        }
        .wrapper {
            padding: 40px;
            font-family: arial, helvetica;
            box-shadow: 0 0 5px 5px #aeb4ae;
            background-color: #fff;
            transform: rotate(-5deg);
            -moz-transform: rotate(-5deg);
            -webkit-transform: rotate(-5deg);
            padding: 30px 40px 40px;
            max-width: 750px;
            margin: 30px auto;
        }
        h1 {
            font-size: 2.75rem;
            font-weight: 400;
            line-height: auto;
        }
        h2 {
            font-size: 2.0rem;
            font-weight: 400;
            margin: 0 0 0.5rem 0
        }
        h3 {
            font-size: 1.4rem;
            font-weight: bold;
            margin: 0 0 0.5rem 0
        }
        p {
            font-size: 1.125rem;
        } 

        p.small {
            font-size: 0.9rem;
            color: #666;
        }
        a {
            color: #006cb7;
            text-decoration: none;
        }
        .importance {
            display: none;
        }
        .alert {
            opacity: 0;
        }

        .alert-info {
            color: #000;
            font-size: 1.2rem;
            min-height: 4.4rem;
            border-radius: .15rem;
            border: 1px solid #faebcc;
            position: relative;
            padding: 1rem;
            background-color: #fcf8e3;
            opacity: 1;
            transition: opacity 0.5s ease-in;
        }

        .team-alerted {
            padding-top: 1rem;
            font-size: 1.2rem;
        }

        .importance-marker {
            width: 1rem;
            height: 1rem;
            display: inline-block;
            font-weight: normal;
            border-radius: 10px;
            box-shadow: 1px 1px 1px #cccccc;
            background: #ddd;
            margin-right: 0.5rem;
        }

        .importance-marker.low {
            background: #dddddd;
        }
        
        .importance-marker.medium {
            background: #24a0d8;
        }
        
        .importance-marker.high {
            background: #d85497;
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
  css: css
};
