import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Card } from "antd";

export default function FieldCard() {
    <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        aa
      </Card>
}