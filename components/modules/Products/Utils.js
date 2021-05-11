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

const createProduct = async event => {
  event.preventDefault();
  const form = event.target;

  const optionList = (x) => {
    const optList = x.split(',');
    return optList.slice(0, optList.length - 1)
  };

  const inputOption1 = event.target.inputOption1? optionList(event.target.inputOption1.value) : [];
  const variantType1 = event.target.variantType1? event.target.variantType1.value : null;

  const inputOption2 = event.target.inputOption2? optionList(event.target.inputOption2.value) : [];
  const variantType2 = event.target.variantType2? event.target.variantType2.value : null;

  const inputOption3 = event.target.inputOption3? optionList(event.target.inputOption3.value) : [];
  const variantType3 = event.target.variantType3? event.target.variantType3.value : null;

  var variantPrices = {}
  var variantInventories = {}

  optionValues.map(item => (
    variantPrices[item] = event.target['price_' + item].value
  ))

  optionValues.map(item => (
    variantInventories[item] = Number(event.target['inventory_' + item].value)
  ))

  const res = await fetch('https://sahvana-admin.herokuapp.com/api/create_product', {

    body: JSON.stringify({
      title: event.target.title.value,
      description: event.target.description.value,
      total_inventory: Number(event.target.inventory.value),
      original_price: event.target.original_price.value, 
      promotional_price: event.target.promotional_price.value,
      gender: event.target.gender.value,
      category: event.target.category.value,
      subcategory: event.target.subcategory.value,
      has_variant: event.target.has_variant.value,
      variantType1: variantType1,
      inputOption1: inputOption1,
      variantType2: variantType2,
      inputOption2: inputOption2,
      variantType3: variantType3,
      inputOption3: inputOption3,
      variantPrices: variantPrices,
      variantInventories: variantInventories,
      imageFiles: [
        imageFile1,
        imageFile2,
        imageFile3,
        imageFile4
      
      ],
      date: new Date(),
      email: session.user.email
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  const result = await res.text();
  Router.reload();
};

export default { generateOptionsCombinations, createProduct };