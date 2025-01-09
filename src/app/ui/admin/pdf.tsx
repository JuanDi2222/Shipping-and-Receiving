"use client";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";

export function PDFView(data: any) {
  const notice = data.data;

  Font.register({
    family: "rambla",
    src: "https://fonts.gstatic.com/s/abel/v6/N59kklKPso9WzbZH9jwJSg.ttf",
  });

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
      textAlign: "justify",
      fontFamily: "rambla",
    },
    text: {
      fontSize: 16,
      textAlign: "justify",
      fontFamily: "rambla",
      margin: 10,
    },
    table: {
      width: "auto",
      margin: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      padding: 5,
    },
    tableHeader: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    tableCell: {
      fontSize: 12,
      textAlign: "center",
    },
  });

  

  const destinies = [
    { name: "EPDC", key: "epdc", bulkKey: "bulksepdc" },
    { name: "ETDC", key: "etdc", bulkKey: "bulksetdc" },
    { name: "DHL", key: "dhl", bulkKey: "bulksdhl" },
    { name: "FedEx", key: "fedex", bulkKey: "bulks" },
    { name: "UPS", key: "ups", bulkKey: "bulksups" },
    { name: "FedEx Ground", key: "fedexground", bulkKey: "bulksfdxground" },
    { name: `${notice.other}`, key: "other", bulkKey: "bulksOther" },
  ];

  const renderTableRows = () => {
    return destinies
      .filter((destiny) => notice[destiny.key])
      .map((destiny, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{destiny.name}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {notice[destiny.bulkKey] ?? "N/A"}
            </Text>
          </View>
        </View>
      ));
  };

  const PDF = () => {
    return (
      <Document>
        <Page size="A4">
          <View style={styles.id}>
            <Text>No: {notice.id}</Text>
          </View>
          <View>
            <Text style={styles.title}>
              PHINIA TECHNOLOGIES HOLDINGS MEXICO S DE RL DE CV
            </Text>
            <Text style={styles.subtitle}>
              Ave. Hermanos Escobar #5756-B Col. Fovissste Chamizal, CP. 32310
              Cd. Juárez, Chih.
            </Text>
            <Text style={styles.title2}>AVISO DE EMBARQUE MTC</Text>
            <Text style={styles.time}>
              Fecha: {new Date(notice.date).toLocaleDateString()}                                                                               Hora:{" "}
              {new Date(notice.date).toLocaleTimeString()}
            </Text>
            <Text style={styles.text}>Placas: {notice.plates}</Text>
            <Text style={styles.text}>Linea de Transporte: {notice.line}</Text>
            <Text style={styles.text}>Bultos: {notice.bulks}                                                                                          Descripcion: {notice.description}</Text>
            <Text style={styles.text}>Sello#: 0{notice.seal}</Text>
            <Text style={styles.text}>
              Manifiestos de embarque: {notice.manifest}
            </Text>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableHeader}>Destino</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableHeader}>Bultos</Text>
                </View>
              </View>
              {renderTableRows()}
            </View>
            <Text style={styles.text}>_____________________________</Text>

            <Text style={styles.text}>Nombre del Operador: {notice.operator}                                 Generado por: {notice.creator}</Text>
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