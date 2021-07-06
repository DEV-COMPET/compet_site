import axios from 'axios';
import styles from '../styles/ExMembros.module.css'

export default function ExMembros({dados}) {
    return (
      
      <div className={styles.groupDiv}>
          <title>COMPET | Ex-membros</title> 
          <main className={styles.main}>
          <h1 className={styles.title}> Ex-membros</h1>
          </main>

          <div className={styles.test}>
          <div className={styles.descript}> O COMPET tem como objetivo o crescimento dos seus integrantes, suas contribuições aos colegas de curso, 
          ao curso, à instituição e à sociedade, de forma a atuarem em ensino, pesquisa e extensão. Desde sua criação o COMPET foi contemplado
          com a participação de diversos membros que contribuíram para o crescimento do grupo: </div>
          </div>
          
          {dados.map(data => ( data.email == "" ? data.email = '-' : 
            data.linkedin == "" ? data.linkedin = '-' : 
            data.data_inicio.lenght  ? data.data_inicio = '-' :  
            data.membro_ativo == false ?


            <div className={styles.membros}> 
            <div></div>
            <p><strong>Nome: </strong> {data.nome} </p>
            <p><strong>Email: </strong> {data.email}</p>
            <p><strong>Linked-In: </strong> {data.linkedin}</p>
            <p><strong>Entrada: </strong> {(data.data_inicio)}</p>  
            <p><strong>Saída: </strong> {data.data_fim}</p>          
            </div> : <div></div>
                        
          ))}
      </div>
    )
  }



ExMembros.getInitialProps = async () => {
    const response = await axios.get (
      'http://localhost:3000/api/membros'
    );
    console.log(response);  
    return { dados: response.data }
  };
