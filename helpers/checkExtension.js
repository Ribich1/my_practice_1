export const checkExtension = (fileName) => {
  const EXTENSIONS = ["txt", "css", "html", "json"];
  const inculdedDot = fileName.lastIndexOf(".");
  const extension = fileName.slice(inculdedDot + 1);
  const result = EXTENSIONS.includes(extension);
  return { extension, result };
};

// extension:  result:
