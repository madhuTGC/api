
const Product = require ("../models/product");

const getAllProducts = async(req,res)=>{
  const {company,name,featured,sort,select} = req.query;
  const queryObject = {};
  if (company){
    queryObject.company = company;
    console.log(queryObject.company)
  }

  if (featured){
    queryObject.company = company;
  }

  if (name){
    queryObject.name = {$regex:name,$options:"i"};
  }

  let apiData = Product.find(queryObject);


  if(sort){
    let sortFix = sort.replace(",","");
    apiData = apiData.sort(sortFix);

  }


  if(select){
    // let selectFix = select.replace(",","");


    let selectFix = select.split(",").join(" ");

    apiData = apiData.select(selectFix);

  }

  let page = Number(req.query.page)|| 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (page - 1)*limit;
  apiData = apiData.skip(skip).limit(limit);



  // page = 2;
  // limit =3 ;
  // skip = 1*3=3;
  // (select = name),company;



  const myData = await apiData;


  res.status(200).json({myData, nbHits:myData.length});
};

const getAllProductsTesting = async(req,res)=>{

  const myData = await Product.find(req.query).skip(2);

  // sort = name,price;

  res.status(200).json({myData,nbHits:myData.length})
};

module.exports = {getAllProducts,getAllProductsTesting};