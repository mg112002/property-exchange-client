<template>
    <div class='features'>
        <div class='slanted-div' />
        <div class="features-content" style="margin-top: 18%">
            <em><h1 style="margin-left: 10%; margin-bottom: 1%; font-weight: bold; font-size: 75px; display: inline-block">BUY</h1></em>
            <img style="float: right" src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='buy' />
            <p style="width: 50%; font-size: 30px; display: inline-block;">User can buy variety of properties by searching for type of property here at BookMyProperty.</p>
        </div>
        <div class="features-content" style="margin-top: 1%">
            <em><h1 style="margin-left: 13%; margin-bottom: 1%; font-weight: bold; font-size: 75px; display: inline-block">SELL</h1></em>
            <img style="float: left" src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='sell' />
            <p style="margin-left: 8%; width: 42%; font-size: 30px; display: inline-block">User can list their property @BookMyProperty by providing valid property details along with RERA number.</p>
        </div>
        <div class="features-content" style="margin-top: 1%">
            <em><h1 style="margin-left: 10%; margin-bottom: 1%; font-weight: bold; font-size: 75px; display: inline-block">RENT</h1></em>
            <img style="float: right" src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='rent' />
            <p style="width: 50%; font-size: 30px; display: inline-block">Properties available for rent along with amenities and property description</p>
        </div>
        <div class="features-content" style="margin-top: 1%">
            <em><h1 style="margin-left: 3%; margin-bottom: 1%; font-weight: bold; font-size: 75px; display: inline-block">PREMIUM</h1></em>
            <img style="float: left;" src='https://img.freepik.com/free-vector/premium-collection-badge-design-vector_53876-43821.jpg?w=740&t=st=1682025843~exp=1682026443~hmac=159746b1601b3aa5541db01f7426a1b77ac2faadabc45c18e13245759c40858d' alt='premium' />
            <p style="margin-left: 7%; width: 42%; font-size: 30px; display: inline-block">Posting a property as premium adds the property to the Hot list which is highlighted and visible at the Homepage.</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'FeaturesEl'
}
</script>

<style scoped>
.features {
    height: 2475px;
    color: white;
    position: relative;
    overflow: hidden;
    margin-bottom: 2%;
    font-family: 'Montserrat', sans-serif;
}
.slanted-div {
    margin-top: 3%;
    height: 2025px;
    width: calc(1.414 * 100%);
    transform: rotate(10deg);
    transform-origin: top left;
    position: absolute;
    top: -2px;
    left: -1px;
    box-sizing: border-box;
    background-image: linear-gradient(45deg, #6928CD, #000000);
}

.features-content {
    width: 55%;
    margin: 50% 25% 5% 25%;
    position: relative;
    display: inline-block;
}

img {
    height: 400px;
    width: 50%;
    border-radius: 100%;
}
</style>