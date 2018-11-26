import React from 'react';
import $ from 'jquery';

import './Table.css';

const Table = ({ datas }) => {
  var gradesArray = [];
  datas.grades.map(grade => {
    for (let i = 0; i < grade.coeff; i++) {
      var coefficientsAdded = gradesArray.push(grade.grade);
    }
    return coefficientsAdded;
  });
  var gradesSum = gradesArray.reduce((total, number) => {
    return total + number;
  }, 0);
  var gradesAverage = gradesSum / gradesArray.length;

  function toInput(evt) {
    var e = evt.target;
    if (e.tagName === 'TD') {
      e.setAttribute('value', e.innerHTML);
      e.innerHTML= '<input class="App-Table-Input" type="text" value="'+ e.innerHTML +'">' +
                    '<button class="App-Table-Save">Sauver</button>' +
                    '<button class="App-Table-Cancel">Annuler</button>';

      e.querySelector('input').focus();
    }
    else if (e.className === 'App-Table-Save') {
      e.parentNode.innerHTML= e.parentNode.querySelector('input').value;
    }
    else if (e.className === 'App-Table-Cancel') {
      e.parentNode.innerHTML= e.parentNode.getAttribute('value');
    }
  }

  function handleChange(evt) {
    let state = this.state;
    if (evt.target.className === 'App-Table-Grade') {
      state[datas.grades.grade] = evt.target.value;
      console.log(state[datas.grades.grade]);
      console.log(evt.target.value);
    } else {
      state[datas.grades.coeff] = evt.target.value;
    }
    this.setState({ datas: evt.target.value });
  }

  return (
    <div className="App-Table">
      <table>
        <tbody>
          {datas.grades.map((grade, i) => {
            return (
              <tr className="App-Table-Row" key={i}>
                <td
                  className="App-Table-Name App-Table-Column"
                >{grade.name}</td>
                <td
                  className="App-Table-Coeff App-Table-Column"
                  onChange={handleChange}
                  onClick={toInput}
                >{grade.coeff}</td>
                <td
                  className="App-Table-Grade App-Table-Column"
                  onChange={handleChange}
                  onClick={toInput}
                >{grade.grade}/20</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="App-Table-Average">Moyenne</td>
            {gradesAverage >= 10 ?
              <td id="App-Table-Result-Positive" colSpan={2}>
                {gradesAverage.toFixed(2)}
              </td>
              :
              <td id="App-Table-Result-Negative" colSpan={2}>
                {gradesAverage.toFixed(2)}
              </td>
            }
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
