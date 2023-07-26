export default function() {
  return [
    {
      title: "Stock Overview",
      to: "/stock-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Check Stock",
      to: "/check-stock",
      htmlBefore: '<i class="material-icons">bar_chart</i>',
      htmlAfter: ""
    },
    {
      title: "Recommended Stock",
      to: "/recommendations",
      htmlBefore: '<i class="material-icons">token</i>',
      htmlAfter: ""
    },
  ];
}
