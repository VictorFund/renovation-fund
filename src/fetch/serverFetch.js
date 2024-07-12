import Loader from "@/components/Loader/Loader";

export const getData = async (folderName) => {
  const res = await fetch(`${process.env.URL}/api/${folderName}`, {
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// const items = await getData("projects");

// console.log("server items", items);
