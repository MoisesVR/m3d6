const button = document.querySelector("#search")
const input = document.querySelector("#mountClp")
const option = document.querySelector("#moneySelected")
let result = document.querySelector("#answer") 

button.addEventListener("click", () =>{
    let mount = input.value
    if(input.value == ""){
        alert("Ingrese una cantidad")
    }else if(isNaN(mount)){
        alert("Ingresa solo numeros")
    }
    console.log("input -->", mount);
    input.value = ""
    let money = option.value
    console.log("option -->", money);
    getMoney(mount, money)
})

async function getMoney(mount, money) {
    try {
        const res = await fetch("https://mindicador.cl/api/")
        if (res.status == 200) {
            const data = await res.json()
            let resultFinal
            let resultText
            if (money == "euro") {
                resultFinal = mount * data.euro.valor
                console.log(data.euro.valor);
                resultText = "Resultado euro: $"
                result.innerHTML = (resultText + resultFinal)
                chartEuro()
            }
            else if (money == "dolar") {
                resultFinal = mount * data.dolar.valor
                resultText = "Resultado dolar: $"
                result.innerHTML = (resultText + resultFinal);
                chartDolar()
            }
        }
        else if(res.status == 400){
            let error = new Error(" 400 Bad Request")
            throw error
        }
        else if(res.status == 403){
            let error = new Error(" 403 Forbidden")
            throw error
        }
        else if(res.status == 404){
            let error = new Error(" 404 Not Found")
            throw error
        }
        else if(res.status == 500){
            let error = new Error(" 500 Internal Server Error")
            throw error
        }
    }
    catch (error){
        alert(error.name + error.message)
    }
}

var chartEuro = function () {
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Precio del euro los ultimos 10 dias"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "29/07/2022",  y: 930.92  },
				{ label: "30/07/2022", y: 926.24  },
				{ label: "31/07/2022", y: 926.24  },
				{ label: "01/08/2022",  y: 926.24  },
				{ label: "02/08/2022",  y: 924.04  },
                { label: "03/08/2022",  y: 913.76  },
                { label: "04/08/2022",  y: 922.21  },
                { label: "05/08/2022",  y: 926.33  },
                { label: "06/08/2022",  y: 926.33  },
                { label: "07/08/2022",  y: 923.41  },
			]
		}
		]
	});
	chart.render();
}
var chartDolar = function () {
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Precio del dolar los ultimos 10 dias"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "29/07/2022",  y: 911.42  },
				{ label: "30/07/2022", y: 911.42  },
				{ label: "31/07/2022", y: 911.42  },
				{ label: "01/08/2022",  y: 905.1 },
				{ label: "02/08/2022",  y: 893.19  },
                { label: "03/08/2022",  y: 897.22  },
                { label: "04/08/2022",  y: 907.82  },
                { label: "05/08/2022",  y: 903.91  },
                { label: "06/08/2022",  y: 903.91  },
                { label: "07/08/2022",  y: 916  },
			]
		}
		]
	});
	chart.render();
}