import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  box:{
    border: 5,
    borderColor: "black",
  },
  h2_tilte:{
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#DCDCDC'
  }
});

const DateParse = (date) => {
    const event = new Date(date);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

return event.toLocaleDateString('fr-FR', options);
}

const PDF = ({user, tree}) => (
  <Document>
    <Page size="A4" style={styles.page}>
    <Text style={styles.title}>Reçu au titre des dons Numéro d'ordre du reçu à certains organismes d'intérêt général</Text>
      <View style={styles.box}>
        <Text style={styles.h2_tilte} >Bénéficiaire des versements </Text>
        <Text>Nom ou dénomination : </Text>
        <Text>Give a tree</Text>
        <Text>Adresse : </Text>
        <Text>N°4 Rue Privet Drive</Text>
        <Text>Code postal : 10934 Commune : Little Whinging</Text>
        <Text>Objet : </Text>
        <Text>Reçu dans le cadre d'un don pour l'achat d'un d'arbre</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.h2_tilte} >Donateur </Text>
        <Text>Nom : {user.lastName} Prénom : {user.firstName}</Text>
        <Text>Adresse : {user.street}</Text>
        <Text>Code postal : {user.cp} Commune : {user.city}</Text>
        <Text>Le bénéficiaire reconnaît avoir reçu au titre des dons et versements ouvrant droit à réduction d'impôt, la somme de :</Text>
        <Text>{tree.price.$numberDecimal} Euros</Text>
        <Text>Date du versement ou du don : {DateParse(tree.updatedAt)} </Text>
        <Text>En cas de don en numéraire, mode de versement du don : carte bancaire </Text>
      </View>

      <Text>Signature :</Text>

    </Page>
  </Document>
);

export default PDF;