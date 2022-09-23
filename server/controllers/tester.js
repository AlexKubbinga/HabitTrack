const params = new URLSearchParams({
  habit_name: 'Same wake and bed time',
});
const query = params.toString();
const url = `https://thecatapi.com/?${query}`;
console.log(url);
