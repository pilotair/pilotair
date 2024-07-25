import { Typography, Checkbox, Image } from "antd";
import { MouseEvent, useContext, useState } from "react";
import { Pilotair } from "@/schema";
import { MenuItemKeys } from "@/common/menus/constants";
import RenameForm from "./rename-form";
import ContextMenu from "@/common/menus/context-menu";
import { FileOutlined, FolderTwoTone } from "@ant-design/icons";
import { ModalContext } from "@/common/modals/context";

interface Props {
  entry: Pilotair.Core.Stores.Files.Entry;
  selected: boolean;
  onSelected: (value: boolean) => void;
  onDelete: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

export default function EntryItem({
  entry,
  selected,
  onSelected,
  onClick,
  onDelete,
}: Props) {
  const { Text } = Typography;
  const modal = useContext(ModalContext);
  const [preview, setPreview] = useState(false);

  function handleRename() {
    modal.open({
      title: "Rename",
      children: <RenameForm path={entry.relationPath} />,
    });
  }

  const commonContextMenus = [
    { key: MenuItemKeys.rename, onClick: handleRename },
    { key: MenuItemKeys.delete, onClick: onDelete },
  ];

  function getPreview() {
    switch (entry.type) {
      case "Folder":
        return <FolderTwoTone className="text-7xl" />;
      case "Image":
        return (
          <Image
            className="object-contain"
            width={56}
            height={56}
            src={`/${entry.relationPath}`}
            onClick={() => setPreview(true)}
            preview={{
              visible: preview,
              src: `/${entry.relationPath}`,
              onVisibleChange: (value) => {
                setPreview(value);
              },
              mask: false,
            }}
          />
        );

      default:
        return <FileOutlined className="text-5xl" />;
    }
  }

  function handleCheckboxClick(e: MouseEvent) {
    e.stopPropagation();
    onSelected(!selected);
  }

  return (
    <ContextMenu items={[...commonContextMenus]}>
      <div
        className={
          "w-28 h-28 inline-flex flex-col items-center justify-center hover:bg-gray-300 rounded-md relative group" +
          (selected ? " bg-blue-300/30" : "")
        }
      >
        <div
          onClick={onClick}
          className="w-16 h-16 flex justify-center items-center cursor-pointer"
        >
          {getPreview()}
        </div>
        <Text className="px-1" ellipsis={true}>
          {entry.name}
        </Text>
        <Checkbox
          checked={selected}
          className={
            "absolute top-1 left-1 opacity-0 group-hover:opacity-100" +
            (selected ? " opacity-100" : "")
          }
          onClick={handleCheckboxClick}
        />
      </div>
    </ContextMenu>
  );
}
