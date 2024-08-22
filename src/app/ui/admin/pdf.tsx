"use client";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";


export default function PDFView(data: any) {
  const notice = data.data;

  Font.register({
    family: "rambla",
    src: "http://fonts.gstatic.com/s/abel/v6/N59kklKPso9WzbZH9jwJSg.ttf",
  })

  const styles = StyleSheet.create({
    id: {
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: 14,
      color: "black",
      textAlign: "right",
      padding: 20,
    },
    title: {
      fontFamily: "Helvetica",
      fontWeight: "normal",
      fontSize: 18,
      color: "black",
      textAlign: "center",
      padding: 5,
    },
    subtitle: {
      fontWeight: 1000,
      fontSize: 10,
      color: "black",
      textAlign: "center",
      padding: 3,
    },
    title2: {
      fontStyle: "italic",
      fontWeight: 100,
      fontSize: 22,
      color: "black",
      textAlign: "center",
      marginTop: 10,
    },
    time: {
      margin: 30,
      fontSize: 16,
      textAlign: 'justify',
      fontFamily: 'rambla',

    },
    text: {
      fontSize: 16,
      textAlign: 'justify',
      fontFamily: 'rambla', 
      margin: 10,
    }
  })
  
    const PDF = () => {
      return (
        <Document>
          <Page size="A4" >
            <View style={styles.id}>
              <Text>No: {notice.id}</Text>
            </View>
            <View  >
              <Text style={styles.title}>PHINIA TECHNOLOGIES HOLDINGS MEXICO S DE RL DE CV</Text>
              <Text style={styles.subtitle}>Ave. Hermanos Escobar #5756-B Col. Fovissste Chamizal, CP. 32310 Cd. Juárez, Chih.</Text>
              <Text style={styles.title2}>AVISO DE EMBARQUE MTC</Text>
              <Text style={styles.time}>Fecha: {notice.date.toLocaleDateString()}                                                                                Hora:  {notice.date.toLocaleTimeString()}</Text>
              <Text style={styles.text}>Linea de Transporte: {notice.line}</Text>
              <Text style={styles.text}>Bultos: {notice.bulks}</Text>
              <Text style={styles.text}>Nombre del Operador: {notice.operator}</Text>
              <Text style={styles.text}>Generado por: {notice.creator}</Text>
              <Text style={styles.text}>Sello#: {notice.seal}</Text>
              <Text style={styles.text}>Placas: {notice.plates}</Text>
              <Text style={styles.text}>Manifiestos de embarque: {notice.manifest}</Text>

           </View>
          </Page>
        </Document>
      );
    };


  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  if (client) {
    return (
      
      <PDFViewer
        className="w-full"
        showToolbar={true}
        height={1000}
        width={1000}
      >
        <PDF />
      </PDFViewer>
    );
  }
}
