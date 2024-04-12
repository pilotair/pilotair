import { Counter } from "../components/Counter";
import { Layout } from "../components/Layout";
import { Button } from "antd"

export default function () {
  return (
    <Layout title="Home">
      <Counter />
      <div style={{ height: "20px" }}></div>
      <Button>btn</Button>
      <p>
        <a href="/">Home</a>
      </p>
      <p>
        <a href="/_admin/settings">Settings</a>
      </p>
    </Layout>
  );
}
