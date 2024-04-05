// function formatPrice(value) {
//     const formatter = new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND',
//     });

//     return (
//       <span style={{ color: 'red' }}>
//         {formatter.format(value).replace('₫', '')}đ
//       </span>
//     );
//   }

function formatPrice(value) {
    const formattedValue = new Intl.NumberFormat("vi-VN").format(value);
    const displayValue = formattedValue + " VND";

    return <span style={{ color: "red" }}>{displayValue}</span>;
}

export { formatPrice };
