import React, { useEffect, useState } from 'react';
import { View, Dimensions,Text } from 'react-native';
import { BarChart} from 'react-native-chart-kit';

const Revenue1 = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const {role_id} = route.params;
  useEffect(() => {
    fetchData(role_id);
  }, []);

  const fetchData = async (role_id) => {
    try {
      const response = await fetch(`https://apiservice20230520171820.azurewebsites.net/revenue?role_id=${role_id}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          Revenue by product of branch
        </Text>
        <BarChart
          data={{
            labels: data.map((item) => item.id),
            datasets: [
              {
                data: data.map((item) => item.revenue),

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
        /></View>
    </View>
  );
};
export default Revenue1;