import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, FlatList } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const MyScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://apiservice20230520171820.azurewebsites.net/roleid');
      const roleIds = await response.json();

      const fetchDataPromises = roleIds.map(async (role_id) => {
        const response = await fetch(`https://apiservice20230520171820.azurewebsites.net/revenue?role_id=${role_id}`);
        const jsonData = await response.json();
        return { apiIndex: role_id, data: jsonData };
      });

      const responseData = await Promise.all(fetchDataPromises);
      setData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
        Revenue by product of branch (API {item.apiIndex})
      </Text>
      <BarChart
        data={{
          labels: item.data.map((dataItem) => dataItem.id),
          datasets: [
            {
              data: item.data.map((dataItem) => dataItem.revenue),
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={220}
        yAxisLabel={'$'}
        xAxisLabel={'id'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyScreen;