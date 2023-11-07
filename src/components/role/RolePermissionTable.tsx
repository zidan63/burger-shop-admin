import { memo, useEffect, useState } from "react";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import useDidUpdate from "@hooks/useDidUpdate";
import { useAppSelector } from "@store";
import { RoleSelectors } from "@store/role";

export const RolePermissionTable = memo<any>(
  ({ onChange, permissionIds: permissionIdsExtenal }) => {
    const listPermission = useAppSelector(RoleSelectors.getListPermission());
    const [permissionIds, setPermissionIds] = useState<string[]>(permissionIdsExtenal);

    const handleChangePermission = (id: string) => {
      const permissionId = permissionIds.find((perId) => perId === id);
      if (permissionId) {
        setPermissionIds((pev) => pev.filter((perId) => perId !== id));
      } else setPermissionIds((pev) => [...pev, id]);
    };

    useDidUpdate(() => {
      onChange(permissionIds);
    }, [permissionIds]);

    useDidUpdate(() => {
      setPermissionIds(permissionIdsExtenal);
    }, [permissionIdsExtenal]);

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
              <TableCell align="center">Xem chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPermission.map((per: any, index: number) => {
              return (
                <GroupPermission
                  key={per?.typeName}
                  index={index + 1}
                  info={per}
                  onChange={handleChangePermission}
                  permissionIds={permissionIds}
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
  }
);

const GroupPermission = ({ index, info, onChange, permissionIds }) => {
  const CREATE = info?.permissions.find((per) => per?.code.includes("CREATE"));
  const UPDATE = info?.permissions.find((per) => per?.code.includes("UPDATE"));
  const DELETE = info?.permissions.find((per) => per?.code.includes("DELETE"));
  const SEARCH = info?.permissions.find((per) => per?.code.includes("SEARCH"));
  const DETAILS = info?.permissions.find((per) => per?.code.includes("DETAIL"));

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TableRow hover>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="left">{info?.typeName}</TableCell>
      <TableCell align="center">
        <Checkbox
          disabled={!CREATE}
          value={CREATE?.id}
          checked={permissionIds.includes(CREATE?.id)}
          onChange={handleOnChange}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          disabled={!UPDATE}
          value={UPDATE?.id}
          checked={permissionIds.includes(UPDATE?.id)}
          onChange={handleOnChange}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          disabled={!DELETE}
          value={DELETE?.id}
          checked={permissionIds.includes(DELETE?.id)}
          onChange={handleOnChange}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          disabled={!SEARCH}
          value={SEARCH?.id}
          checked={permissionIds.includes(SEARCH?.id)}
          onChange={handleOnChange}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          disabled={!DETAILS}
          value={DETAILS?.id}
          checked={permissionIds.includes(DETAILS?.id)}
          onChange={handleOnChange}
        />
      </TableCell>
    </TableRow>
  );
};
