function bgc(value) {
  document.body.style.backgroundColor = value
}

function setIcon(value) {
  let link = document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = value;
}