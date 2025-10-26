window.addEventListener("load", () => {
  navigator.serviceWorker.register("../sw.js?proxy", {
    scope: "/win/",
  });
});

let xl;

try {
  xl = window.top.location.pathname === "/URLexeNcode_Iframe7.js";
} catch {
  try {
    xl = window.parent.location.pathname === "/URLexeNcode_Iframe7.js";   
  } catch {
    xl = false;
  }
}

const form = document.getElementById("4m");
const input = document.getElementById("searchPass");

if (form && input) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    try {
      if (xl) processUrl(input.value, "");
      else processUrl(input.value, "/URLexeNcode_Iframe7.js");
    } catch {
      processUrl(input.value, "/URLexeNcode_Iframe7.js");
    }
  });
}
function processUrl(value, path) {
  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://www.duckduckgo.com/search?q=";

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url));
  const dy = localStorage.getItem("dy");

  if (dy === "true") {
    window.location.href = `/win/item/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    location.href = path;
  } else {
    window.location.href = `/win/${__uv$config.encodeUrl(url)}`;
  }
}

function go(value) {
  processUrl(value, "/URLexeNcode_Iframe7.js");
}

function blank(value) {
  processUrl(value);
}

function dy(value) {
  processUrl(value, `/win/item/${__uv$config.encodeUrl(value)}`);
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  ) {
    return true;
  }
  return false;
}