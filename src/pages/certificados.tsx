import axios from "axios";
import ReactPaginate from 'react-paginate';
import styles from "../styles/Certificados.module.css";
import Menu from '../components/menu'
import Footer from '../components/footer';
import SearchBox from '../components/SearchBox';
import Link from 'next/link'
import { useState } from 'react'
import { makeStyles } from '@material-ui/styles';

Certificados.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/certificados");
  return { dados: response.data }
}

function loadPhotos(CompetTalks: boolean, CompBio: boolean) {
  if (CompetTalks) {
    return "https://i.ibb.co/ydS39Rr/Compet-Talks.png"
  } else if (CompBio) {
    return "https://i.ibb.co/Lv8x2kF/CompBio.png"
  } else {
    return "https://i.ibb.co/cFt0r4m/Certificados-Padrao.png"
  }
}

function convertDate(stringDate) {
  const date = new Date(stringDate)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const formatted = `${day}/${month}/${year}`
  return formatted
}

const useStyles = makeStyles((theme) => ({
  pagination: {
    listStyle: "none",
    fontSize: "17px",
    display: "flex",
    paddingLeft: "0px",
    justifyContent: "center",
  },
  page_link: {
    fontWeight: "bold",
    display: "flex",
    position: "relative",
    color: "#004266",
    textDecoration: "none",
    border: "1px solid #d8d9da",
    backgroundColor: "#fff",
    padding: ".555rem .795rem",
    transition: "color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out",
    "&:hover": {
      color: "#0a58ca",
      backgroundColor: "#e9ecef",
      borderColor: "#99999984",
    },
  },
  page_prev: {
    border: "1px solid #d8d9da",
    backgroundColor: "#fff",
    padding: ".555rem .795rem",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    "&:hover": {
      color: "#0a58ca",
      backgroundColor: "#e9ecef",
      borderColor: "#99999984",
    },
  },
  page_next: {
    border: "1px solid #d8d9da",
    backgroundColor: "#fff",
    padding: ".555rem .795rem",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    "&:hover": {
      color: "#0a58ca",
      backgroundColor: "#e9ecef",
      borderColor: "#99999984",
    },
  },
  activeLink: {
    border: '1px solid #0a58ca'
  }
}));


export default function Certificados({ dados }) {
  const [query, setQuery] = useState("")
  const classes = useStyles()

  return (
    <div className={styles.pageContent}>
      <title>COMPET | Certificados</title>
      <Menu />
      {renderCabecalho()}
      <div className={styles.searchContainer}>
        <SearchBox placeholder="Pesquisar certificado..." setQuery={setQuery} />
      </div>
      {
        PaginatedItems(dados.filter((certificado) => {
          return certificado.titulo.toLowerCase().includes(query.toLowerCase())
        }), classes)
      }

      <Footer />
    </div>
  );
}

const renderCabecalho = () => {
  return (
    <div className={styles.pageHeader}>
      <div><img src="https://i.ibb.co/tsD3xNg/certificados.png" /></div>
    </div>
  )
}

const renderCertificados = (dadosAtuais) => {
  return (
    <div className={styles.certificadosArea}>
      <div className={styles.certificadosContainer}>
        {dadosAtuais.map(certificado => (
          <div key={certificado._id} className={styles.certificadoCard}>
            <div ><img src={loadPhotos(certificado.compet_talks, certificado.compbio)} alt="" className={styles.certificadoImg} /></div>
            <div className={styles.certificadoTitulo}>{certificado.titulo}</div>
            <div className={styles.certificadoData}>{convertDate(certificado.data)}</div>
            <div className={styles.certificadoLink}><Link href={certificado.link}><a target="_blank">Acessar</a></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaginatedItems(items, classes) {
  const itemsPerPage = 8;
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    setItemOffset(event.selected);
  };

  return (
    <>
      {
        renderCertificados(
          items.slice(itemOffset * itemsPerPage, (itemOffset + 1) * itemsPerPage)
        )
      }
      <div className={styles.containerPaginate}>
        <ReactPaginate
          nextLabel="Próximo"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="Anterior"
          pageClassName={classes.page_item}
          pageLinkClassName={classes.page_link}
          previousClassName={classes.page_prev}
          previousLinkClassName={classes.page_prev_link}
          nextClassName={classes.page_next}
          nextLinkClassName={classes.page_next_link}
          breakLabel="..."
          breakClassName={classes.page_item}
          breakLinkClassName={classes.page_link}
          containerClassName={classes.pagination}
          activeClassName={classes.active}
          activeLinkClassName={classes.activeLink}
        />
      </div>
    </>
  )

}







