import React,{Component, Fragment} from 'react'
import './MilkTea.css'
import MilkTeaList from './MilkTea_Item/MIlkTeaList'

/**
 * jsx中有的坑:
 *      1. 自定义组件,定义时开头要大写!
 *      2.如果标签中使用class,要写成className;
 *      3.使用onchange/onclick时,c要大写成C!
 *      4.label中,使用for和id进行绑定时,应将for换成htmlFor
 */     

class MilkTea extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue:'波霸奶茶',
            list:['珍珠奶茶','椰果奶茶']
        }
    }
    render(){
        // return后加括号是为了可以换行~
        return (
            // 在flex中,如果外层套了一层div会有影响! 所以可以使用<Fragment />,它在实际渲染中会被忽略
            <Fragment>
                <div>
                    {/* 
                        jsx中使用方法时,一定要记住:func.bind(this)!
                        否则func中的this=undefind!
                        使用bind(this)后,this就指向这个实例
                     */}
                    <input className='input' placeholder='请输入奶茶名字' 
                    value={this.state.inputValue} 
                    onChange={this.inputChange.bind(this)} />
                    <button onClick={this.addList.bind(this)}>提交</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item,idx)=>{
                            // key不能重复,不建议直接idx
                            return (
                                // <li 
                                //     key={idx+'wsy'}
                                //     onClick={this.delList.bind(this,idx)}
                                // >
                                //     {item}
                                // </li>

                                // 组件化
                                <MilkTeaList 
                                    type='red'
                                    content={item}
                                    idx={idx}
                                    key={idx+'wsy'}
                                    // 将方法写进属性
                                    delList={this.delList.bind(this)}
                                />
                            ) 
                        })
                    }
                </ul>
            </Fragment>
        )
    }

    // 实现双向数据绑定: 利用onChange实时更改数据,再通过setState(react特有状态机制)来更新视图
    inputChange(e){
        // console.log(this)
        // console.log(e.target.value)
        this.setState({
            inputValue : e.target.value
        })        
    }

    // 增加列表
    addList(e){
        this.setState({
            list:this.state.list = [...this.state.list,this.state.inputValue],
            inputValue:''
        })
    }

    // 删除列表
    delList(idx){
        let list = this.state.list
        list.splice(idx,1)
        this.setState({
            list:list
        })
        
        // 错误写法! 能跑起来,但后期会造成巨大的性能问题!
        // this.state.list.splice(idx,1)
        // this.setState({
        //     list:this.state.list
        // })
    }
}

// 要记得暴露出去
export default MilkTea