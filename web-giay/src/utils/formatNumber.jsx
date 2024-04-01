function formatPrice(value) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  
    return (
      <span style={{ color: 'red' }}>
        {formatter.format(value).replace('₫', '')}đ
      </span>
    );
  }

  export  {formatPrice}