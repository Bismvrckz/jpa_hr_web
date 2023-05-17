export default function AdminIndex() {}

export async function getServerSideProps() {
  return { redirect: { destination: "/admin/jobLists" } };
}
