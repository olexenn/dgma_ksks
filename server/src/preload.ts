window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector);
    if (element)
      element.innerText = text;
    const shit = document.getElementById("shit");
    if (shit)
      shit.innerText = "World"
  }

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});
