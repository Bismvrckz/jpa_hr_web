export default function profile(props: any) {
  return <div></div>;
}

export async function getServerSideProps() {
  try {
  } catch (error) {
    return { props: { error } };
  }
}
