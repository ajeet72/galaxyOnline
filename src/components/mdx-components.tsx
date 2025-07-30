import MyAlert from "./my-alert";


export const components = {
  MyAlert,
  table: (props: any) => (
    <table
      className="w-full border border-gray-300 border-collapse my-6"
      {...props}
    />
  ),
  thead: (props: any) => <thead className="bg-gray-100" {...props} />,
  th: (props: any) => (
    <th className="border border-gray-300 px-4 py-2 text-left" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
};
