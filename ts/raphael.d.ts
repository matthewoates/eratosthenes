/*
    Copyright (c) 2012 T. Michael Keesey

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// RaphaelTS is a TypeScript (http://typescriptlang.org/) declaration file for RaphaëlJS (http://raphaeljs.com/).
// Version 0.1 -- untested

declare module raphaeljs
{
        interface Raphael
        {
                easing_formulas:EasingFormulas;
                el:any;
                eve:Eve;
                fn:any;
                st:any;
                svg:bool;
                type:string;
                version:string;
                vml:bool;
                
                (container:HTMLElement, width:number, height:number, callback?:Function):Paper;
                (containerID:string, width:number, height:number, callback?:Function):Paper;
                (x:number, y:number, width:number, height:number, callback?:Function):Paper;
                (all:any[], callback?:Function):Paper;
                (onReadyCallback?:Function):Paper;
                
                angle(x1:number, y1:number, x2:number, y2:number, x3?:number, y3?:number):number;
                animation(params:any, ms:number, easing?:string, callback?:Function):Animation;
                bezierBBox(p1x:number, p1y:number, c1x:number, c1y:number, c2x:number, c2y:number, p2x:number, p2y:number):BBox1;
                bezierBBox(bez:number[]):BBox1;
                color(clr:string):ColorDetails;
                createUUID():string;
                deg(rad:number):number;
                findDotsAtSegment(p1x:number, p1y:number, c1x:number, c1y:number, c2x:number, c2y:number, p2x:number, p2y:number, t:number):SegmentDots;
                format(token:string, ...values:any[]):string;
                fulfill(token:string, json:any):string;
                getColor:GetColor;
                getPointAtLength(path:string, length:number):AnglePoint;
                getRGB(color:string):ColorParsed;
                getSubpath(path:string, from:number, to:number):string;
                getTotalLength(path:string):number;
                hsb(h:number, s:number, b:number):string;
                hsb2rgb(h:number, s:number, b:number):Color;
                hsl(h:number, s:number, l:number):string;
                hsl2rgb(h:number, s:number, l:number):Color;
                is(o:any, type:string):bool;
                isBBoxIntersect(bBox1:string, bBox2:string):bool;
                isPointInsideBBox(bBox:string, x:number, y:number):bool;
                isPointInsidePath(path:string, x:number, y:number):bool;
                mapPath(path:string, matrix:Matrix):string;
                matrix(a:number, b:number, c:number, d:number, e:number, f:number):Matrix;
                ninja():Raphael;
                parsePathString(path:string):string[];
                parsePathString(segments:string[]):string[];
                parseTransformString(transformation:string):string[];
                parseTransformString(transformations:string[]):string[];
                path2curve(path:string):string[];
                path2curve(segments:string[]):string[];
                pathBBox(path:string):BBox2;
                pathIntersection(path1:string, path2:string):Intersection[];
                pathToRelative(path:string):string[];
                pathToRelative(segments:string[]):string[];
                rad(deg:number):number;
                registerFont(font:Font):any;
                rgb(r:number, g:number, b:number):string;
                rgb2hsb(r:number, g:number, b:number):HSB;
                rgb2hsl(r:number, g:number, b:number):HSL;
                setWindow(newwin:Window):void;
                snapTo(values:number[], value:number, tolerance?:number):number;
                toMatrix(path:string, transform:string):Matrix;
                toMatrix(path:string, transforms:string[]):Matrix;
                transformPath(path:string, transform:string):string;
                transformPath(path:string, transforms:string[]):string;
        }
        
        interface AnglePoint extends Point
        {
                alpha:number;
        }
        
        interface Animation
        {
                delay(delay:number):Animation;
                repeat(repeat:number):Animation;
        }
        
        interface AnimationStatus
        {
                anim:Animation;
                status:number;
        }
        
        interface BBox1
        {
                min:Point;
                max:Point;
        }
        
        interface BBox2 extends Point
        {
                height:number;
                width:number;
                x2:number;
                y2:number;
        }
        
        interface Color
        {
                b:number;
                error:bool;
                g:number;
                hex:string;
                r:number;
        }
        
        interface ColorParsed extends Color
        {
                error:bool;
        }
        
        interface ColorDetails extends ColorParsed, HSL
        {
                v:number;
        }
        
        interface EasingFormulas
        {
                // Missing convenience properties, such as '<', but those would need to use subscript notation anyway.
                backIn:(n:number) => number;
                backOut:(n:number) => number;
                bounce:(n:number) => number;
                easeIn:(n:number) => number;
                easeInOut:(n:number) => number;
                easeOut:(n:number) => number;
                elastic:(n:number) => number;
                linear:(n:number) => number;
        }
        
        interface Element
        {
                id:number;
                matrix:Matrix;
                next:Element;
                node:HTMLElement;
                paper:Paper;
                prev:Element;
                raphael:Raphael;
                animate(params:any, ms:number, easing?:string, callback?:Function):Element;
                animate(animation:Animation):Element;
                animateWith(el:Element, anim:Animation, params:any, ms:number, easing?:string, callback?:Function):Element;
                animateWith(element:Element, anim:Animation, animation:Animation):Element;
                attr(attrName:string, value:string):Element;
                attr(params:any):Element;
                attr(attrName:string):any;
                attr(attrNames:string[]):any[];
                attr():any;
                click(handler:Function):Element;
                clone():Element;
                data(key:string, value:any):Element;
                data(key:string):any;
                dblclick(handler:Function):Element;
                drag(onMove?:(dx:number, dy:number, x:number, y:number, event:Event) => any, onStart?:(x:number, y:number, event:Event) => any, onEnd?:(event:Event) => any, mContext?:any, sContext?:any, eContext?:any):Element;
                getBBox():BBox2;
                getBBox(isWithoutTransform:bool):BBox2;
                getPointAtLength(length:number):AnglePoint;
                getSubpath(from:number, to:number):string;
                getTotalLength():number;
                glow(glow?:Glow):PaperSet;
                hide():Element;
                hover(inHandler:Function, outHandler:Function, iContext?:any, oContext?:any):Element;
                insertAfter(element:Element):Element;
                insertBefore(element:Element):Element;
                isPointInside(x:number, y:number):bool;
                mousedown(handler:Function):Element;
                mousemove(handler:Function):Element;
                mouseout(handler:Function):Element;
                mouseover(handler:Function):Element;
                mouseup(handler:Function):Element;
                onDragOver(f:Function):void;
                pause(anim?:Animation):Element;
                remove():void;
                removeData():Element;
                removeData(key:string):Element;
                resume(anim?:Animation):Element;
                rotate(deg:number, cx?:number, cy?:number):Element; // Deprecated; use transform
                scale(sx:number, sy:number, cx?:number, cy?:number):Element; // Deprecated; use transform
                setTime(anim:Animation):void;
                setTime(anim:Animation, value:number):Element;
                show():void;
                status():AnimationStatus[];
                status(anim:Animation):number;
                status(anim:Animation, value:number):Element;
                stop():Element;
                stop(anim:Animation):Element;
                toBack():Element;
                toFront():Element;
                touchcancel(handler:Function):Element;
                touchend(handler:Function):Element;
                touchmove(handler:Function):Element;
                touchstart(handler:Function):Element;
                transform():string;
                transform(tstr:string):Element;
                translate(dx:number, dy:number):Element; // Deprecated; use transform
                unclick(handler:Function):Element;
                undblclick(handler:Function):Element;
                undrag():void;
                unhover(inHandler:Function, outHandler:Function):Element;
                unmousedown(handler:Function):Element;
                unmousemove(handler:Function):Element;
                unmouseout(handler:Function):Element;
                unmouseover(handler:Function):Element;
                unmouseup(handler:Function):Element;
                untouchcancel(handler:Function):Element;
                untouchend(handler:Function):Element;
                untouchmove(handler:Function):Element;
                untouchstart(handler:Function):Element;
        }
        
        interface Eve
        {
                version:string;
                (name:string, scope:any, ...varargs:any[]):any[];
                listeners(name:string):Function[];
                nt():string;
                nt(subname:string):bool;
                off(name:string, f?:Function):void;
                on(name:string, f:Function):(zIndex:number) => void;
                once(name:string, f:Function):(zIndex:number) => void;
                stop():void;
                unbind(name:string, f?:Function):void;
        }
        
        // Not actually part of RaphaëlJS, this empty interface is just used to indicate intent.
        interface Font
        {
        }
        
        interface GetColor
        {
                (brightness?:number):string;
                reset():void;
        }
        
        interface Glow
        {
                color?:string;
                fill?:bool;
                offsetx?:number;
                offsety?:number;
                opacity?:number;
                width?:number;
        }
        
        interface HSB
        {
                b:number;
                h:number;
                s:number;
        }
        
        interface HSL
        {
                h:number;
                l:number;
                s:number;
        }
        
        interface Intersection extends Point
        {
                t1:number;
                t2:number;
                segment1:number;
                segment2:number;
                bez1:number[];
                bez2:number[];
        }
        
        interface Matrix
        {
                add(a:number, b:number, c:number, d:number, e:number, f:number, matrix:Matrix):void;
                clone():Matrix;
                invert():Matrix;
                rotate(a:number, x:number, y:number):void;
                sclae(x:number, y?:number, cx?:number, cy?:number):void;
                split():MatrixSplit;
                toTransformString():string;
                translate(x:number, y:number):void;
                x(x:number, y:number):number;
                y(x:number, y:number):number;
        }
        
        interface MatrixSplit
        {
                dx:number;
                dy:number;
                scalex:number;
                scaley:number;
                shear:number;
                rotate:number;
                isSimple:bool;
        }
        
        interface Paper
        {
                bottom:Element;
                ca:any;
                customAttributes:any;
                raphael:Raphael;
                top:Element;
                width:number;
                height:number;
                
                add(json:any):any;
                circle(x:number, y:number, r:number):Element;
                clear():void;
                ellipse(x:number, y:number, rx:number, ry:number):Element;
                forEach(callback:(element:Element) => any, thisarg?:any):Paper;
                getById(id:number):Element;
                getElementByPoint(x:number, y:number):Element;
                getElementsByPoint(x:number, y:number):Set;
                getFont(family:string, weight?:string, style?:string, stretch?:string):Font;
                image(src:string, x:number, y:number, width:number, height:number):Element;
                path(pathString?:string):Element;
                print(x:number, y:number, s:string, font:Font, size?:number, origin?:string, letterSpacing?:number):Element;
                rect(x:number, y:number, width:number, height:number):Element;
                remove():void;
                renderfix():void;
                safari():void;
                set():PaperSet;
                setFinish():PaperSet;
                setSize(width:number, height:number):void;
                setStart():void;
                setViewBox(x:number, y:number, w:number, h:number, fit?:bool):Paper;
                text(x:number, y:number, text:string):Element;          
        }
        
        interface PaperSet extends Element
        {
                length:number;

                concat(...elements:Element[]):PaperSet;
                concat(...sets:PaperSet[]):PaperSet;
                indexOf(element:Element):number;
                lastIndexOf(element:Element):number;
                pop():Element;
                push(...args:Element[]):number;
                reverse():PaperSet;
                shift():Element;
                slice(start:number, end?:number):PaperSet;
                sort(f?:(a:Element, b:Element) => number):PaperSet;
                splice(index:number, length:number, ...elements:Element[]):PaperSet;
                unshift(...args:Element[]):number;
        }
        
        interface Point
        {
                x:number;
                y:number;
        }
        
        interface SegmentDots extends AnglePoint
        {
                end:Point;
                m:Point;
                n:Point;
                start:Point;
        }
        
        interface Set
        {
                clear():void;
                exclude(element:Element):bool;
                forEach(callback:(element:Element) => any, thisArg?:any):Set;
                pop():Element;
                push(...elements:Element[]):Element;
                splice(index:number, count:number, element?:Element/*, ...elements*/):Set;
        }
}

declare var Raphael:raphaeljs.Raphael;
