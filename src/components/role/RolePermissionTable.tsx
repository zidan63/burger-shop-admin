import { memo, useEffect, useState } from "react";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import useDidUpdate from "@hooks/useDidUpdate";
import { useAppSelector } from "@store";
import { RoleSelectors } from "@store/role";
import { Permission } from "@services/role";

export type Props = {
  onChange: (permission: Permission[]) => void;
  permissions: Permission[];
};

export const RolePermissionTable = memo<Props>(({ onChange, permissions: permissionsExtenal }) => {
  const listPermission = useAppSelector(RoleSelectors.getListPermission());
  const [permissions, setPermissions] = useState<Permission[]>(permissionsExtenal);

  const handleChangePermission = (permission?: Permission) => {
    if (!permission) return;
    const isExist = permissions.find((p) => p.id === permission.id);
    if (isExist) {
      setPermissions((prev) => prev.filter((p) => p.id !== permission.id));
    } else {
      setPermissions((prev) => [...prev, permission]);
    }
  };

  useDidUpdate(() => {
    onChange(permissions);
  }, [permissions.length]);

  useDidUpdate(() => {
    if (permissionsExtenal.length === permissions.length) return;
    setPermissions(permissionsExtenal);
  }, [permissionsExtenal]);

  return (
    <Box>
      <Table sx={{ borderRadius: "6px" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Chức năng</TableCell>
            <TableCell align="center">Thêm</TableCell>
            <TableCell align="center">Chỉnh sửa</TableCell>
            <TableCell align="center">Xóa</TableCell>
            <TableCell align="center">Tìm kiếm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listPermission.map((groupInfo, index: number) => {
            return (
              <GroupPermission
                key={groupInfo.typeName}
                index={index + 1}
                groupInfo={groupInfo}
                onChange={handleChangePermission}
                permissions={permissions}
              />
            );
          })}
        </TableBody>
      </Table>
      {listPermission?.length <= 0 ||
        (listPermission === undefined && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 5,
              borderRadius: "6px",
              background: "#f5f5f5",
              fontWeight: "500",
              mt: 1,
            }}
          >
            Không có dữ liệu
          </Box>
        ))}
    </Box>
  );
});

type GroupPermissionProps = {
  index: number;
  permissions: Permission[];
  onChange: (permission?: Permission) => void;
  groupInfo: {
    permissions: Permission[];
    typeName: string;
  };
};

const GroupPermission = memo<GroupPermissionProps>(
  ({ index, groupInfo, onChange, permissions }) => {
    const permissionIds = permissions.map((p) => p.id);
    const CREATE = groupInfo.permissions.find((per) => per?.code.includes("CREATE"));
    const UPDATE = groupInfo.permissions.find((per) => per?.code.includes("UPDATE"));
    const DELETE = groupInfo.permissions.find((per) => per?.code.includes("DELETE"));
    const READ = groupInfo.permissions.find((per) => per?.code.includes("READ"));

    return (
      <TableRow hover>
        <TableCell align="center">{index}</TableCell>
        <TableCell align="left">{groupInfo?.typeName}</TableCell>
        <TableCell align="center">
          <Checkbox
            disabled={!CREATE}
            value={CREATE}
            checked={permissionIds.includes(CREATE?.id || "")}
            onChange={() => onChange(CREATE)}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            disabled={!UPDATE}
            value={UPDATE}
            checked={permissionIds.includes(UPDATE?.id || "")}
            onChange={() => onChange(UPDATE)}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            disabled={!DELETE}
            value={DELETE}
            checked={permissionIds.includes(DELETE?.id || "")}
            onChange={() => onChange(DELETE)}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            disabled={!READ}
            value={READ}
            checked={permissionIds.includes(READ?.id || "")}
            onChange={() => onChange(READ)}
          />
        </TableCell>
      </TableRow>
    );
  }
);
