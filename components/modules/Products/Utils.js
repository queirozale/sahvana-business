const generateOptionsCombinations = (optionValues) => {
  var optionsCombinations = [];
  var options1 = optionValues[1];
  var options2 = optionValues[2];
  var options3 = optionValues[3];

  if (options2.length == 0 && options3.length == 0) {
    options1.map(x => (
      optionsCombinations.push(x)
    ))
  } else if (options2.length > 0 && options3.length == 0) {
    options1.map(x => (
      options2.map(y => (
        x.length * y.length > 0 && optionsCombinations.push(x + '/' + y)
      ))
    ))
  } else if (options2.length == 0 && options3.length > 0) {
    options1.map(x => (
      options3.map(z => (
        x.length * z.length > 0 && optionsCombinations.push(x + '/' + z)
      ))
    ))
  } else {
    options1.map(x => (
      options2.map(y => (
        options3.map(z => (
          x.length * y.length * z.length > 0 && optionsCombinations.push(x + '/' + y + '/' + z)
        ))
      ))
    ))
  };

  return optionsCombinations;
};

const createProduct = async (data) => {

  const res = await fetch('https://sahvana-admin.herokuapp.com/api/create_product', {

    body: JSON.stringify({
      title: data.title,
      description: data.description,
      total_inventory: data.total_inventory,
      original_price: data.original_price, 
      promotional_price: data.promotional_price,
      gender: data.gender,
      category: data.category,
      subcategory: data.subcategory,
      has_variant: data.has_variant,
      variantType1: data.variantType1,
      inputOption1: data.inputOption1,
      variantType2: data.variantType2,
      inputOption2: data.inputOption2,
      variantType3: data.variantType3,
      inputOption3: data.inputOption3,
      variantPrices: data.variantPrices,
      variantInventories: data.variantInventories,
      imageFiles: data.imageFiles,
      created_at: data.created_at,
      updated_at: data.updated_at,
      email: data.email
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  const result = await res.text();
};

const todayDateString = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  return today;
}


export default { generateOptionsCombinations, createProduct, todayDateString };