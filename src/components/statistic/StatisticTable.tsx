import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Box, Grid, Stack, Tab } from "@mui/material";
import { OrderSelectors, OrderThunks } from "@store/order";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getDatesThisWeekDates, getTimeThisWeekDates, listMonths } from "@utils/DateUtil";
import { useAppDispatch, useAppSelector } from "@store";
import { useEffect, useRef, useState } from "react";

import { Bar } from "react-chartjs-2";
import { ButtonCustom } from "@components/_common/ButtonCustom";
import { CardCustom } from "@components/_common/CardCustom";
import { DateTimePickerCustom } from "@components/_common/DateTimePickerCustom";
import { FilterAdvance } from "@components/_common/FilterAdvance";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import { SearchType } from "@types";
import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import _ from "lodash";
import { log } from "console";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
type Result = {
  totalMoneyEach: number[];
  amountProductEach: number[];
};
export const StatisticTable: React.FC = () => {
  const [value, setValue] = useState("1");
  const handleFuncRefs = useRef<any>({});
  const dateHandler = useRef<any>((field: string) => {
    const ref = {
      current: undefined,
    };
    handleFuncRefs.current[field] = ref;
    return ref;
  });
  const { orders, totalOrder } = useAppSelector(OrderSelectors.getAll());
  const [listDates, setListDates] = useState<string[]>([]);
  const [top5Clients, setClients] = useState<string[]>([]);
  const [top5Employees, setEmployees] = useState<string[]>([]);
  const [top5Products, setProducts] = useState<string[]>([]);
  const [resultByWeekday, setResultByWeekday] = useState<Result>({
    totalMoneyEach: [],
    amountProductEach: [],
  });
  const [resultByMonth, setResultByMonth] = useState<Result>({
    totalMoneyEach: [],
    amountProductEach: [],
  });
  const [resultByRange, setResultByRange] = useState<Result>({
    totalMoneyEach: [],
    amountProductEach: [],
  });
  const [resultTop5Clients, setResultTop5Clients] = useState<Result>({
    totalMoneyEach: [],
    amountProductEach: [],
  });
  const [resultTop5Products, setResultTop5Products] = useState<Result>({
    totalMoneyEach: [],
    amountProductEach: [],
  });
  const [resultTop5Employees, setResultTop5Employees] = useState<Result>({
    totalMoneyEach: [],
    amountProductEach: [],
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    switch (newValue) {
      case "1": {
        const listDates = getTimeThisWeekDates();
        console.log(listDates);

        const filter = {
          searchType: SearchType.ADVANCED,
          page: 1,
          createdAtFrom: listDates[0],
          createdAtTo: listDates[listDates.length - 1],
        };

        dispatch(
          OrderThunks.statisticSearch({
            orderFilter: filter,
          })
        );
        break;
      }
      case "2": {
        const end = moment(new Date()).endOf("year");
        const filter = {
          searchType: SearchType.ADVANCED,
          page: 1,
          createdAtFrom: moment().day(1).month(1).year(new Date().getFullYear()).toDate().getTime(),
          createdAtTo: moment().day(31).month(11).year(new Date().getFullYear()).toDate().getTime(),
        };
        console.log(end.toDate().getDate(), 12, new Date().getFullYear());
        console.log(
          moment()
            .day(end.toDate().getDate())
            .month(12)
            .year(new Date().getFullYear())
            .toDate()
            .getFullYear()
        );
        console.log(filter, 2);
        dispatch(
          OrderThunks.statisticSearch({
            orderFilter: filter,
          })
        );
        break;
      }

      case "3": {
        dispatch(OrderThunks.search({}));
      }
      case "4": {
        dispatch(OrderThunks.search({}));
      }
      case "5": {
        dispatch(OrderThunks.search({}));
      }
      case "6": {
        dispatch(OrderThunks.search({}));
      }

      default:
        break;
    }
    setValue(newValue);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    // alert(value);
  }, [value]);

  useEffect(() => {
    console.log(orders);

    if (orders && orders.length > 0) {
      console.log(value);

      switch (value) {
        case "1": {
          console.log("Thu", orders);
          // alert("handl 1");
          const dates: number[] = getDatesThisWeekDates();
          console.log("Date 1 ne", dates);

          const result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };

          for (let i = 0; i <= 6; i++) {
            let tempTotalMoney = 0,
              tempTotalProduct = 0;

            orders.forEach((order) => {
              const dateTime = new Date(order.createdAt);
              const date = dateTime.getDate();
              const weekDay = dateTime.getDay();
              // console.log("Date ne", date);
              console.log(dateTime);

              if (date == dates[i]) {
                order.billDetails.forEach((billDetail) => {
                  tempTotalMoney += billDetail.amount * billDetail.priceSaleBill;
                  tempTotalProduct += billDetail.amount;
                });
                // result.amountProductEach.push(order.billDetails.length);
                // result.totalMoneyEach.push(tempTotalMoney);
                result.amountProductEach[weekDay] = tempTotalProduct;
                result.totalMoneyEach[weekDay] = tempTotalMoney;
              }
            });
          }
          // console.log(result);
          setResultByWeekday(result);
          break;
        }
        case "2": {
          const result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };

          for (let i = 1; i <= 12; i++) {
            let tempTotalMoney = 0,
              tempTotalProduct = 0;
            orders.forEach((order) => {
              const dateTime = new Date(order.createdAt);
              const month = dateTime.getMonth() + 1;

              if (month == i) {
                order.billDetails.forEach((billDetail) => {
                  tempTotalMoney += billDetail.amount * billDetail.priceSaleBill;
                  tempTotalProduct += billDetail.amount;
                });
                console.log(tempTotalProduct);

                result.amountProductEach[month - 1] = tempTotalProduct;
                result.totalMoneyEach[month - 1] = tempTotalMoney;
              }
            });
          }
          console.log(result);
          setResultByMonth(result);
          break;
        }

        case "3": {
          let result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };
          let listClient: Set<string> = new Set();

          orders.forEach((order) => {
            // console.log(order.user);
            if (order.user) {
              listClient.add(order.user.fullName);
            }
          });
          let index = 0;
          listClient.forEach((user) => {
            let tempTotalMoney = 0,
              tempAmountProduct = 0;
            orders.forEach((order) => {
              if (order.employee && order.user && order.user.fullName == user) {
                order.billDetails.forEach((billDetail) => {
                  tempTotalMoney += billDetail.amount * billDetail.priceSaleBill;
                  tempAmountProduct += billDetail.amount;
                });
              }
              result.amountProductEach[index] = tempAmountProduct;
              result.totalMoneyEach[index] = tempTotalMoney;
            });
            index++;
          });
          let _listClient = Array.from(listClient);
          let list: any = [];
          for (let j = 0; j < result.amountProductEach.length; j++)
            list.push({
              amountProductEach: result.amountProductEach[j],
              totalMoneyEach: result.totalMoneyEach[j],
              listClient: _listClient[j],
            });
          // console.log(list, _listClient);
          list.sort(function (a, b) {
            return a.amountProductEach > b.amountProductEach;
          });
          for (let k = 0; k < list.length; k++) {
            _.set(result, `totalMoneyEach[${k}]`, list[k].totalMoneyEach);
            _.set(result, `amountProductEach[${k}]`, list[k].amountProductEach);
            listClient[k] = list[k].listClient;
          }
          setClients(_listClient);
          setResultTop5Clients(result);
        }
        case "4": {
          let result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };
          let listEmployee: Set<string> = new Set();

          orders.forEach((order) => {
            // console.log(order.user);
            if (order.employee) {
              listEmployee.add(order.employee.fullName);
            }
          });
          let index = 0;
          listEmployee.forEach((employee) => {
            let tempTotalMoney = 0,
              tempAmountProduct = 0;
            orders.forEach((order) => {
              if (order.employee && order.employee.fullName == employee) {
                order.billDetails.forEach((billDetail) => {
                  console.log(billDetail);

                  tempTotalMoney += billDetail.amount * billDetail.priceSaleBill;
                  console.log(tempTotalMoney);

                  tempAmountProduct += billDetail.amount;
                });
              }
              result.amountProductEach[index] = tempAmountProduct;
              result.totalMoneyEach[index] = tempTotalMoney;
            });
            index++;
          });
          let _listEmployee = Array.from(listEmployee);
          let list: any = [];
          for (let j = 0; j < result.amountProductEach.length; j++)
            list.push({
              amountProductEach: result.amountProductEach[j],
              totalMoneyEach: result.totalMoneyEach[j],
              listEmployee: _listEmployee[j],
            });
          // console.log(list, _listClient);
          list.sort(function (a, b) {
            return a.amountProductEach > b.amountProductEach;
          });
          for (let k = 0; k < list.length; k++) {
            _.set(result, `totalMoneyEach[${k}]`, list[k].totalMoneyEach);
            _.set(result, `amountProductEach[${k}]`, list[k].amountProductEach);
            listEmployee[k] = list[k].listEmployee;
          }
          setEmployees(_listEmployee);
          setResultTop5Employees(result);
          break;
        }
        case "5": {
          let result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };

          let listProduct: Set<string> = new Set();
          orders.forEach((order) => {
            order.billDetails.forEach((billDetail) => {
              listProduct.add(billDetail.product.name);
            });
          });
          let index = 0;
          listProduct.forEach((product) => {
            let tempTotalMoney = 0,
              tempAmountProduct = 0;
            orders.forEach((order) => {
              order.billDetails.forEach((billDetail) => {
                if (billDetail.product.name === product) {
                  tempTotalMoney += billDetail.amount * billDetail.priceSaleBill;
                  tempAmountProduct += billDetail.amount;
                }
              });
              result.amountProductEach[index] = tempAmountProduct;
              result.totalMoneyEach[index] = tempTotalMoney;
            });
            index++;
          });
          let _listProduct = Array.from(listProduct);
          let list: any = [];
          for (let j = 0; j < result.amountProductEach.length; j++)
            list.push({
              amountProductEach: result.amountProductEach[j],
              totalMoneyEach: result.totalMoneyEach[j],
              listProduct: _listProduct[j],
            });
          list.sort(function (a, b) {
            return a.amountProductEach > b.amountProductEach;
          });
          for (let k = 0; k < list.length; k++) {
            _.set(result, `totalMoneyEach[${k}]`, list[k].totalMoneyEach);
            _.set(result, `amountProductEach[${k}]`, list[k].amountProductEach);
            _listProduct[k] = list[k].listProduct;
          }
          setProducts(_listProduct);
          setResultTop5Products(result);
          break;
        }
        case "6": {
          let result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };

          let listProduct: Set<string> = new Set();
          orders.forEach((order) => {
            order.billDetails.forEach((billDetail) => {
              listProduct.add(billDetail.product.name);
            });
          });
          let index = 0;
          listProduct.forEach((product) => {
            let tempTotalMoney = 0,
              tempAmountProduct = 0;
            orders.forEach((order) => {
              order.billDetails.forEach((billDetail) => {
                if (billDetail.product.name === product) {
                  tempTotalMoney += billDetail.amount * billDetail.priceSaleBill;
                  tempAmountProduct += billDetail.amount;
                }
              });
              result.amountProductEach[index] = tempAmountProduct;
              result.totalMoneyEach[index] = tempTotalMoney;
            });
            index++;
          });
          let _listProduct = Array.from(listProduct);
          let list: any = [];
          for (let j = 0; j < result.amountProductEach.length; j++)
            list.push({
              amountProductEach: result.amountProductEach[j],
              totalMoneyEach: result.totalMoneyEach[j],
              listProduct: _listProduct[j],
            });
          list.sort(function (a, b) {
            return a.amountProductEach > b.amountProductEach;
          });
          for (let k = 0; k < list.length; k++) {
            _.set(result, `totalMoneyEach[${k}]`, list[k].totalMoneyEach);
            _.set(result, `amountProductEach[${k}]`, list[k].amountProductEach);
            _listProduct[k] = list[k].listProduct;
          }
          setProducts(_listProduct);
          setResultTop5Products(result);
          break;
        }
        default:
          break;
      }
    }
  }, [orders]);

  const handleSearchAdvance = (e) => {
    e.preventDefault();
    let result: Result = {
      amountProductEach: [],
      totalMoneyEach: [],
    };
    let createdAtFrom = handleFuncRefs.current["createdAtFrom"]?.current?.getValue()?.getTime();
    let createdAtTo =
      handleFuncRefs.current["createdAtTo"]?.current?.getValue()?.getTime() || Date.now();
    if (createdAtFrom && createdAtTo) {
      let listDates: string[] = [];
      for (
        let d = new Date(createdAtFrom);
        d <= new Date(createdAtTo);
        d.setDate(d.getDate() + 1)
      ) {
        let month = d.getMonth();
        let date = d.getDate();
        let year = d.getFullYear();
        let col = `${date}/${month}/${year}`;
        listDates.push(`${date}/${month + 1}/${year}`);
        let amount = 0;
        let totalMoney = 0;
        orders.forEach((order) => {
          let dateOrder = new Date(order.createdAt);
          let month = dateOrder.getMonth();
          let date = dateOrder.getDate();
          let year = dateOrder.getFullYear();
          let dateOrderFull = `${date}/${month}/${year}`;

          if (dateOrderFull == col) {
            order.billDetails.forEach((billDetail) => {
              amount += billDetail.amount;
              totalMoney += billDetail.amount * billDetail.priceSaleBill;
            });
          }
        });
        result.amountProductEach.push(amount);
        result.totalMoneyEach.push(totalMoney);
      }
      setResultByRange(result);
      setListDates([...listDates]);
    }
    console.log(new Date(createdAtFrom), new Date(createdAtTo));
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="statistic">
            <Tab label="Thống kê doanh thu theo thứ" value="1" />
            <Tab label="Thống kê doanh thu theo tháng" value="2" />
            <Tab label="Thống kê khách hàng" value="3" />
            <Tab label="Thống kê nhân viên" value="4" />
            <Tab label="Thống kê sản phẩm" value="5" />
            <Tab label="Thống kê doanh thu theo thời gian" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Bar
            options={{
              responsive: true,
            }}
            data={{
              labels: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
              datasets: [
                {
                  label: "Tiền bán được",
                  data: resultByWeekday.totalMoneyEach,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "Số lượng sản phẩm",
                  data: resultByWeekday.amountProductEach,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </TabPanel>
        <TabPanel value="2">
          <Bar
            options={{
              responsive: true,
            }}
            data={{
              labels: listMonths(),
              datasets: [
                {
                  label: "Tiền bán được",
                  data: resultByMonth.totalMoneyEach,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "Số lượng sản phẩm",
                  data: resultByMonth.amountProductEach,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </TabPanel>
        <TabPanel value="3">
          <Bar
            options={{
              responsive: true,
            }}
            data={{
              labels: top5Clients as any,
              datasets: [
                {
                  label: "Số tiền đã mua",
                  data: resultTop5Clients.totalMoneyEach,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "Số lượng sản phẩm đã mua",
                  data: resultTop5Clients.amountProductEach,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </TabPanel>
        <TabPanel value="4">
          <Bar
            options={{
              responsive: true,
            }}
            data={{
              labels: top5Employees as any,
              datasets: [
                {
                  label: "Số tiền đã bán",
                  data: resultTop5Employees.totalMoneyEach,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "Số lượng sản phẩm đã bán",
                  data: resultTop5Employees.amountProductEach,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </TabPanel>
        <TabPanel value="5">
          <Bar
            options={{
              responsive: true,
            }}
            data={{
              labels: top5Products as any,
              datasets: [
                {
                  label: "Số tiền đã mua",
                  data: resultTop5Products.totalMoneyEach,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "Số lượng sản phẩm đã mua",
                  data: resultTop5Products.amountProductEach,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </TabPanel>
        <TabPanel value="6">
          <Stack
            direction={"row"}
            justifyContent="center"
            alignItems="center"
            paddingBottom={5}
            component={"form"}
            onReset={() => {
              alert("reeset");
            }}
            onSubmit={(e) => {
              handleSearchAdvance(e);
            }}
          >
            <Stack width={800}>
              <CardCustom>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DateTimePickerCustom
                      label="Từ ngày"
                      handleFuncRef={dateHandler.current("createdAtFrom")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePickerCustom
                      label="Đến ngày"
                      handleFuncRef={dateHandler.current("createdAtTo")}
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 1,
                  }}
                >
                  <Stack gap={2} flexDirection={"row"}>
                    <ButtonCustom
                      type="reset"
                      variant="outlined"
                      title={"Đặt lại"}
                      startIcon={<ReplayIcon />}
                    />
                  </Stack>
                  <Stack gap={2} flexDirection={"row"}>
                    <ButtonCustom type="submit" title={"Tìm kiếm"} startIcon={<SearchIcon />} />
                  </Stack>
                </Box>
              </CardCustom>
            </Stack>
          </Stack>

          <Bar
            options={{
              responsive: true,
            }}
            data={{
              labels: listDates as any,
              datasets: [
                {
                  label: "Số tiền",
                  data: resultByRange.totalMoneyEach,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                  label: "Số lượng sản phẩm đã bán",
                  data: resultByRange.amountProductEach,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
