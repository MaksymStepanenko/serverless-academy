const fs = require('fs').promises;

const listDevelopers = "data.json";
const formatData = "formatData.json";

const readList = async () => {
    let newList = [];
    const data = await fs.readFile(listDevelopers)
    const list = JSON.parse(data)
    list.forEach((item) => {
        const findUniqId = newList.find((dev) => dev.userId === item.user._id)
        if (!findUniqId) {
            newList.push({
                userId: item.user._id,
                userName: item.user.name,
                vacations: [
                    {
                    startDate: item.startDate,
                    endDate: item.endDate
                    }
                ]
            })
        } else {
            findUniqId.vacations.push({
              startDate: item.startDate,
              endDate: item.endDate,
            });
        }
    })

    fs.writeFile(formatData, JSON.stringify(newList, null, 2));
    console.log(newList)
}

readList();
