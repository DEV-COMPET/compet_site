import Menu from "../components/menu";
import SectionTitle from '../components/sectionTitle';
import Footer from "../components/footer";

import styles from "../styles/Changelog.module.css";

import axios from "axios";

Changelog.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/changelog");
  return { dados: response.data };
};

function convertDate(stringDate) {
  const date = new Date(stringDate)

  const day = (date.getDate() + 1).toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const formatted = `${day}/${month}/${year}`
  return formatted
}

export default function Changelog({ dados }) {
  const sectionTitle = "Changelog"
  console.log(dados)
  return (
    <div className={styles.bodyPage}>
      <Menu />
      <div className={styles.pageContent}>
        <SectionTitle title={sectionTitle} />
        {dados.map(data =>
          <div className={styles.cardLog} key={data._id}>
            <div className={styles.nameLog}>{data.name}</div>
            <div className={styles.dateLog}>{convertDate(data.date)}</div>
            <div className={styles.infoLog}>{data.info}</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}