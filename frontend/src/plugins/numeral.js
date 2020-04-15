import Vue from "vue";
import numeral from "numeral";

numeral.register("locale", "br", {
  delimiters: {
    thousands: ".",
    decimal: ","
  },
  currency: {
    symbol: "R$ "
  }
});
numeral.locale("br");

Vue.prototype.$numeral = numeral;
