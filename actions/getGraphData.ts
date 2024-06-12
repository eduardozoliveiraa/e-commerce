import moment from "moment";

export default async function getGraphData() {
  try {
    const startData = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    const result = await prisma?.order.groupBy({
      by: ["createData"],
      where: {
        createData: {
          gte: startData.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    const currentDate = startData.clone();

    while (currentDate <= endDate) {
      const day = currentDate.format("dddd");

      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };
      currentDate.add(1, "day");
    }

    result?.forEach((entry) => {
      const day = moment(entry.createData).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    const formmatedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formmatedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
