import {
  ArcElement,
  Chart,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
Chart.register(ArcElement, LinearScale, PointElement, Tooltip, Legend)

const UniversityChart = () => {
  const UserData = [
    {
      label: 'Cá nhân',
      numberAccount: 0,
    },
    {
      label: 'Cơ quan, trường học',
      numberAccount: 0,
    },
  ]
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.label),
    datasets: [
      {
        label: 'Số lượng tài khoản',
        data: UserData.map((data) => data.numberAccount),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1'],
      },
    ],
  })

  const fetchData = async () => {}
  return (
    <div className="w-48">
      <h1>fdfdf</h1>
      <Doughnut data={userData} />
    </div>
  )
}

export default UniversityChart
