export const getData = async (folderName) => {
  const res = await fetch(`${process.env.URL}/api/${folderName}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};