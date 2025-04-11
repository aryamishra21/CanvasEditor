import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [input,setInput]=useState('');
  const [imgData,setImgData]=useState([]);
  const [error,setError]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    getData();
  }
  const getData=async()=>{
    if(!input.trim()){
      setError('Please enter a search text')
      return;
    }
    try{
      const response=await fetch(`https://api.unsplash.com/search/photos?query=${input}&client_id=${import.meta.env.VITE_API_KEY}`)
      const json=await response.json()
      setImgData(json.results)
      setError('')
    }
    catch(err){
      setError('Failed to fetch images')
    }
  }
  return (
    <div>
      <div
        style={{
          border: "2px solid black",
          margin: "1rem",
          padding: "0.5rem",
          minHeight: "90vh",
        }}
      >
        <div>
          <p>Name: Arya Mishra</p>
          <p>Email: aryamishra212001@gmail.com</p>
        </div>
        <form
        onSubmit={(e)=>handleSubmit(e)}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name=""
            id=""
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            style={{
              padding: "1rem",
              width: "50%",
              borderRadius: "20px 0 0 20px",
              border: "1px solid black",
            }}
            placeholder="Enter your search term"
          />
          <button
            style={{
              padding: "0.95rem",
              borderRadius: "0 20px 20px 0",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
        </form>
        {error && <p style={{color:'red',textAlign:'center'}}>{error}</p>}

        <div style={{ display: "flex",gap:"1rem",width:"100%",margin: "2rem auto 0 auto",flexWrap:"wrap", justifyContent:'center'}}>
          {imgData && imgData.slice(0,4).map((img)=>{
            return(
              <div style={{display:'flex',flexDirection:"column", padding:'2%',borderRadius:'20px', background:'#8f74c2'}} key={img.id}>
              <img style={{height:'15rem',width:'15rem',borderRadius:"20px",objectFit:'cover'}} src={img.urls.regular} alt={input}/>
              <Link to={{pathname:`/edit/${img.id}`}} state={{data:img.urls.regular}} ><button style={{padding:"1rem",width:'15rem',background:'royalblue',font:'1.5rem', fontWeight:'bold',cursor:"pointer", color:'white',border:'none',marginTop:'1rem',borderRadius:'20px'}}>Add Captions</button></Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
