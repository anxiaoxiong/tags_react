import React,{Component} from 'react';
import '../App.css';
import TagApi from '../api/tags';

export default class Tag extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name:"",
      individual_id:"",
      id:0
    }
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    TagApi.getTagList({}).then(res => {
      console.log(res);
      if (res.code === 200 && res.data) {
        console.log("res.data",res.data);
        this.setState({list:res.data});
      }
    }).catch(e => {
      console.log(e);
    })
  }

  async submit() {
    const {id,name,individual_id} = this.state;
    if(id){
      //更新
      TagApi.editTag(id,name,individual_id).then(res => {
        console.log(res);
        if (res.code === 200) {
          alert(res.message);
          this.loadData();
        }
      }).catch(e => {
        console.log(e);
      })
    }else{
      //新增
      TagApi.addTag(name,individual_id).then(res => {
        if (res.code === 200 && res.data) {
          alert(res.message);
          this.loadData();
        }
      }).catch(e => {
        console.log(e);
      })
    }
  }

  async delete() {
    const {id} = this.state;
    TagApi.deleteTag(id).then(res => {
      if (res.code === 200) {
       alert(res.message);
       this.loadData();
      }
    }).catch(e => {
      console.log(e);
    })
  }

  async changeName(event) {
    this.setState({name:event.target.value});
  }

  async changeIndividualId(event) {
    this.setState({individual_id:event.target.value});
  }

  async clickTag(item) {
    const {id,name,individual_id} = item;
    this.setState({id,name,individual_id});
  }

  render() {
    const {name,individual_id,list} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p className="top">点击标签，可进行修改和删除</p>
          <div className="mid">
            {list.map((item,key)=>{
              return <h1 className="tag-item" key={key} onClick={()=>{this.clickTag(item)}}>{item.name}</h1>;
            })}
          </div>
          <p className="foot">
            增加标签：
            标签名字：<input type="text" value={name} onChange={(v)=>{this.changeName(v)}}/>
            所属ID：<input type="text" value={individual_id} onChange={(v)=>{this.changeIndividualId(v)}}/>
            <button onClick={()=>{this.submit()}}>提交</button>
            <button onClick={()=>{this.delete()}}>删除</button>
          </p>
        </header>
      </div>

    );
  }

}