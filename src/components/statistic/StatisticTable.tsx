import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { OrderSelectors, OrderThunks } from "@store/order";
import { useAppDispatch, useAppSelector } from "@store";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SearchType } from "@types";
import { getDatesThisWeekDates, getTimeThisWeekDates, listMonths } from "@utils/DateUtil";
import { log } from "console";
import moment from "moment";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
type Result = {
  totalMoneyEach: number[];
  amountProductEach: number[];
};
export const StatisticTable: React.FC = () => {
  const [value, setValue] = useState("1");
  const { orders, totalOrder } = useAppSelector(OrderSelectors.getAll());
  const [top5Clients, setClients] = useState<string[]>([]);
  const [top5Employees, setEmployees] = useState<string[]>([]);
  const [top5Products, setProducts] = useState<string[]>([]);
  const [resultByWeekday, setResultByWeekday] = useState<Result>({
    totalMoneyEach: [0, 0, 0, 0, 0, 0, 0],
    amountProductEach: [0, 0, 0, 0, 0, 0, 0],
  });
  const [resultByMonth, setResultByMonth] = useState<Result>({
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
    if (orders && orders.length > 0) {
      console.log(value);

      switch (value) {
        case "1": {
          // console.log(orders);
          // alert("handl 1");
          const dates: number[] = getDatesThisWeekDates();
          const result: Result = {
            amountProductEach: [],
            totalMoneyEach: [],
          };

          for (let i = dates[0]; i <= dates[dates.length - 1]; i++) {
            let tempTotalMoney = 0,
              tempTotalProduct = 0;
            orders.forEach((order) => {
              const dateTime = new Date(order.createdAt);
              const date = dateTime.getDate();
              const weekDay = dateTime.getDay();
              if (date == i) {
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
        default:
          break;
      }
    }
  }, [orders]);

  const handleSearchAdvance = (values) => {};

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
      </TabContext>
    </Box>
  );
};
