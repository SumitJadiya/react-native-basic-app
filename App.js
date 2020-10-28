import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, ScrollView, Modal, Dimensions } from 'react-native';
import Todo from "./Todo"
import { LineChart, BarChart } from 'react-native-chart-kit'

const App = () => {

  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [gigs, setGigs] = useState([{
    description: "Job with STJ",
    amount: 499.99,
    timestamp: new Date()
  }])

  const addGig = () => {
    setGigs([...gigs, {
      description,
      amount
    }])

    setDescription('')
    setAmount('')
  }

  useEffect(() => {
    const total = gigs.reduce((total, gig) => (total) + Number(gig.amount), 0)

    setTotalAmount(total)
  }, [gigs])

  return (
    <Modal>
      <SafeAreaView>
        <View >
          <Text style={styles.titleText}>
            Hello! Sumit
          </Text>
        </View>
        <Text style={styles.mediumText}>Total Income :  ${totalAmount}</Text>

        <View>
          <Text>Income Line Chart</Text>

          <LineChart
            data={{
              labels: ["24/10/2020", "25/10/2020", "26/10/2020", "27/10/2020", "28/10/2020", "29/10/2020"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    totalAmount
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "black",
              backgroundGradientTo: "black",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>


        <TextInput
          style={styles.input}
          value={description}
          placeholder="Enter Description"
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          value={amount}
          placeholder="Enter Amount you made"
          keyboardType="numeric"
          onChangeText={text => setAmount(text)}
        />
        <Button disabled={!amount || !description} title='ADD GIG' onPress={addGig} />

        <ScrollView>
          {
            gigs.map((gig, index) => (
              <View>
                <Text>{gig.description}</Text>
                <Text>{gig.amount}</Text>
              </View>
            ))
          }
        </ScrollView>


      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  mediumText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderWidth: 1
  }
})

export default App