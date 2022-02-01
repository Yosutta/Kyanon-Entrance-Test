function checkButton(i, id) {
    console.log(id)
    const btn = document.querySelector(`#checkBtn${i}`)
    console.log(btn.classList.value)
    if (btn.classList.value.includes('btn-warning')) {
        btn.classList.remove('btn-warning')
        btn.classList.add('btn-success')
        btn.innerHTML = 'Complete'

        $.ajax({
            method: "POST",
            url: `/update-to-do/${id}/status`,
        })

    }
    else {
        btn.classList.remove('btn-success')
        btn.classList.add('btn-warning')
        btn.innerHTML = 'New'

        $.ajax({
            method: "POST",
            url: `/update-to-do/${id}/status`,
        })

    }
    // $.ajax({
    //     method: "POST",
    //     url: "/update-to-do/",
    //     data: { search: input.value },
    //     success: function (daata) {
    //         getProduct(daata)
    //     }
    // })
}