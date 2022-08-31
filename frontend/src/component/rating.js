const Rating={
    render: (props)=>{
        if(!props.value){
            return`<div></div>`
        }
        return`
            <div class="rating">
                <span class='material-icons'>${props.value >=1? 'star' : props.value >= 0.5 ? 'star_half' : 'star_border'} </span>
                <span class='material-icons'>${props.value >=2? 'star' : props.value >= 1.5 ? 'star_half' : 'star_border'} </span>
                <span class='material-icons'>${props.value >=3? 'star' : props.value >= 2.5 ? 'star_half' : 'star_border'} </span>
                <span class='material-icons'>${props.value >=4? 'star' : props.value >= 3.5 ? 'star_half' : 'star_border'} </span>
                <span class='material-icons'>${props.value >=5? 'star' : props.value >= 4.5 ? 'star_half' : 'star_border'} </span>
                <span id="reviews"> ${props.text || ''}</span>
            </div>
        `
    }
}

export default Rating;