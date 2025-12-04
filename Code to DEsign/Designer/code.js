// This plugin converts HTML and CSS into Figma designs

// Show UI with resizable window
figma.showUI(__html__, { 
  width: 500, 
  height: 700,
  title: "HTML/CSS to Design",
  themeColors: true
});

// Polyfill for Object.assign if not available
if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

// Helper function to parse CSS styles
function parseCSSStyles(cssText) {
  var styles = {};
  var declarations = cssText.split(';').filter(function(d) { return d.trim(); });
  
  declarations.forEach(function(declaration) {
    var parts = declaration.split(':').map(function(s) { return s.trim(); });
    var property = parts[0];
    var value = parts[1];
    if (property && value) {
      styles[property] = value;
    }
  });
  
  return styles;
}

// Helper function to convert CSS color to Figma RGB
function cssToRgb(color) {
  // Handle empty or invalid color
  if (!color || typeof color !== 'string') {
    return { r: 0, g: 0, b: 0 };
  }
  
  color = color.trim();
  
  // Handle hex colors
  if (color.charAt(0) === '#') {
    var hex = color.substring(1);
    var r, g, b;
    
    // Handle 3-digit hex (#fff)
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    }
    // Handle 6-digit hex (#ffffff)
    else if (hex.length === 6) {
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    }
    // Invalid hex format
    else {
      return { r: 0, g: 0, b: 0 };
    }
    
    // Check for NaN values
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return { r: 0, g: 0, b: 0 };
    }
    
    return { 
      r: Math.min(1, Math.max(0, r / 255)),
      g: Math.min(1, Math.max(0, g / 255)),
      b: Math.min(1, Math.max(0, b / 255))
    };
  }
  
  // Handle rgb/rgba
  if (color.indexOf('rgb') === 0) {
    var matches = color.match(/[\d.]+/g);
    if (matches && matches.length >= 3) {
      var r = parseFloat(matches[0]);
      var g = parseFloat(matches[1]);
      var b = parseFloat(matches[2]);
      
      // Check for NaN values
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return { r: 0, g: 0, b: 0 };
      }
      
      return {
        r: Math.min(1, Math.max(0, r / 255)),
        g: Math.min(1, Math.max(0, g / 255)),
        b: Math.min(1, Math.max(0, b / 255))
      };
    }
  }
  
  // Handle named colors (basic ones)
  var namedColors = {
    'transparent': { r: 1, g: 1, b: 1 },
    'black': { r: 0, g: 0, b: 0 },
    'white': { r: 1, g: 1, b: 1 },
    'red': { r: 1, g: 0, b: 0 },
    'green': { r: 0, g: 0.5, b: 0 },
    'blue': { r: 0, g: 0, b: 1 },
    'yellow': { r: 1, g: 1, b: 0 },
    'cyan': { r: 0, g: 1, b: 1 },
    'magenta': { r: 1, g: 0, b: 1 },
    'gray': { r: 0.5, g: 0.5, b: 0.5 },
    'grey': { r: 0.5, g: 0.5, b: 0.5 },
    'orange': { r: 1, g: 0.65, b: 0 },
    'purple': { r: 0.5, g: 0, b: 0.5 },
    'brown': { r: 0.65, g: 0.16, b: 0.16 },
    'pink': { r: 1, g: 0.75, b: 0.8 },
    'lime': { r: 0, g: 1, b: 0 },
    'navy': { r: 0, g: 0, b: 0.5 },
    'teal': { r: 0, g: 0.5, b: 0.5 },
    'silver': { r: 0.75, g: 0.75, b: 0.75 },
    'aqua': { r: 0, g: 1, b: 1 },
    'maroon': { r: 0.5, g: 0, b: 0 },
    'olive': { r: 0.5, g: 0.5, b: 0 },
    'fuchsia': { r: 1, g: 0, b: 1 }
  };
  
  var colorLower = color.toLowerCase();
  if (namedColors[colorLower]) {
    return namedColors[colorLower];
  }
  
  // Default to white if color can't be parsed (safer than black for fills)
  return { r: 1, g: 1, b: 1 };
}

// Helper function to parse size values
function parseSize(size) {
  if (!size) return 100;
  var value = parseFloat(size);
  return isNaN(value) ? 100 : value;
}

// Apply styles to a Figma node
function applyStylesToNode(node, styles) {
  // Background color
  if (styles['background-color'] || styles['background']) {
    var bgColor = styles['background-color'] || styles['background'];
    if (bgColor && bgColor !== 'transparent' && bgColor !== 'none') {
      var rgb = cssToRgb(bgColor);
      // Validate RGB values
      if (!isNaN(rgb.r) && !isNaN(rgb.g) && !isNaN(rgb.b)) {
        node.fills = [{ type: 'SOLID', color: rgb }];
      }
    }
  }
  
  // Border
  if (styles['border']) {
    var borderParts = styles['border'].split(' ');
    var width = parseFloat(borderParts[0]) || 1;
    var color = borderParts[2] || '#000000';
    var rgb = cssToRgb(color);
    // Validate RGB values
    if (!isNaN(rgb.r) && !isNaN(rgb.g) && !isNaN(rgb.b)) {
      node.strokes = [{ type: 'SOLID', color: rgb }];
      node.strokeWeight = width;
    }
  }
  
  // Border radius
  if (styles['border-radius'] && 'cornerRadius' in node) {
    node.cornerRadius = parseSize(styles['border-radius']);
  }
  
  // Opacity
  if (styles['opacity']) {
    node.opacity = parseFloat(styles['opacity']);
  }
  
  // Padding (affects auto-layout)
  if ('paddingLeft' in node) {
    if (styles['padding']) {
      var padding = parseSize(styles['padding']);
      node.paddingLeft = padding;
      node.paddingRight = padding;
      node.paddingTop = padding;
      node.paddingBottom = padding;
    }
    if (styles['padding-left']) node.paddingLeft = parseSize(styles['padding-left']);
    if (styles['padding-right']) node.paddingRight = parseSize(styles['padding-right']);
    if (styles['padding-top']) node.paddingTop = parseSize(styles['padding-top']);
    if (styles['padding-bottom']) node.paddingBottom = parseSize(styles['padding-bottom']);
  }
}

// Convert array-like to array
function toArray(arrayLike) {
  var arr = [];
  for (var i = 0; i < arrayLike.length; i++) {
    arr.push(arrayLike[i]);
  }
  return arr;
}

// Parse HTML and create Figma nodes
function createDesignFromHTML(html, css) {
  // Create a temporary container to parse HTML
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');
  
  // Parse global CSS rules
  var cssRules = {};
  if (css) {
    // Simple CSS parser for class and ID selectors
    var ruleMatches = css.match(/([.#]?[\w-]+)\s*{([^}]+)}/g);
    if (ruleMatches) {
      ruleMatches.forEach(function(rule) {
        var match = rule.match(/([.#]?[\w-]+)\s*{([^}]+)}/);
        if (match) {
          var selector = match[1];
          var styles = match[2];
          cssRules[selector] = parseCSSStyles(styles);
        }
      });
    }
  }
  
  // Create a frame to hold the design
  var frame = figma.createFrame();
  frame.name = "Generated Design";
  frame.x = figma.viewport.center.x - 200;
  frame.y = figma.viewport.center.y - 200;
  frame.resize(400, 400);
  // Set white background with validation
  var frameColor = { r: 1, g: 1, b: 1 };
  if (!isNaN(frameColor.r) && !isNaN(frameColor.g) && !isNaN(frameColor.b)) {
    frame.fills = [{ type: 'SOLID', color: frameColor }];
  }
  
  // Recursive function to create nodes from HTML elements
  function createNodeFromElement(element, parent, yOffset) {
    if (yOffset === undefined) yOffset = 20;
    var node = null;
    var currentY = yOffset;
    
    // Get element styles
    var elementStyles = {};
    
    // Apply inline styles
    if (element.style && element.style.cssText) {
      Object.assign(elementStyles, parseCSSStyles(element.style.cssText));
    }
    
    // Apply class styles
    if (element.className) {
      var classes = element.className.split(' ');
      classes.forEach(function(cls) {
        if (cssRules['.' + cls]) {
          Object.assign(elementStyles, cssRules['.' + cls]);
        }
      });
    }
    
    // Apply ID styles
    if (element.id && cssRules['#' + element.id]) {
      Object.assign(elementStyles, cssRules['#' + element.id]);
    }
    
    // Create appropriate Figma node based on element type
    var tagName = element.tagName ? element.tagName.toLowerCase() : '';
    
    switch (tagName) {
      case 'div':
      case 'section':
      case 'article':
      case 'main':
      case 'header':
      case 'footer':
      case 'nav':
        node = figma.createFrame();
        node.name = element.className || element.id || tagName;
        node.resize(
          parseSize(elementStyles['width']) || 360,
          parseSize(elementStyles['height']) || 100
        );
        node.x = 20;
        node.y = currentY;
        applyStylesToNode(node, elementStyles);
        
        // Add to parent
        if (parent) {
          parent.appendChild(node);
        } else {
          frame.appendChild(node);
        }
        
        // Process children
        var childY = 20;
        var children = toArray(element.children);
        children.forEach(function(child) {
          childY = createNodeFromElement(child, node, childY);
        });
        
        break;
        
      case 'button':
        node = figma.createFrame();
        node.name = element.textContent || "Button";
        node.resize(
          parseSize(elementStyles['width']) || 120,
          parseSize(elementStyles['height']) || 40
        );
        node.x = 20;
        node.y = currentY;
        node.cornerRadius = 4;
        
        // Default button styles
        var btnBgColor = cssToRgb(elementStyles['background-color'] || '#007bff');
        if (!isNaN(btnBgColor.r) && !isNaN(btnBgColor.g) && !isNaN(btnBgColor.b)) {
          node.fills = [{ type: 'SOLID', color: btnBgColor }];
        }
        applyStylesToNode(node, elementStyles);
        
        // Add text
        var buttonText = figma.createText();
        buttonText.characters = element.textContent || "Button";
        buttonText.fontSize = parseSize(elementStyles['font-size']) || 14;
        var btnTextColor = cssToRgb(elementStyles['color'] || '#ffffff');
        if (!isNaN(btnTextColor.r) && !isNaN(btnTextColor.g) && !isNaN(btnTextColor.b)) {
          buttonText.fills = [{ type: 'SOLID', color: btnTextColor }];
        }
        buttonText.x = (node.width - buttonText.width) / 2;
        buttonText.y = (node.height - buttonText.height) / 2;
        
        node.appendChild(buttonText);
        
        if (parent) {
          parent.appendChild(node);
        } else {
          frame.appendChild(node);
        }
        break;
        
      case 'input':
        node = figma.createFrame();
        node.name = element.placeholder || "Input";
        node.resize(
          parseSize(elementStyles['width']) || 200,
          parseSize(elementStyles['height']) || 40
        );
        node.x = 20;
        node.y = currentY;
        var inputBorderColor = cssToRgb('#cccccc');
        if (!isNaN(inputBorderColor.r) && !isNaN(inputBorderColor.g) && !isNaN(inputBorderColor.b)) {
          node.strokes = [{ type: 'SOLID', color: inputBorderColor }];
        }
        node.strokeWeight = 1;
        node.cornerRadius = 4;
        node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        applyStylesToNode(node, elementStyles);
        
        // Add placeholder text if exists
        if (element.placeholder) {
          var placeholderText = figma.createText();
          placeholderText.characters = element.placeholder;
          placeholderText.fontSize = 14;
          var placeholderColor = cssToRgb('#999999');
          if (!isNaN(placeholderColor.r) && !isNaN(placeholderColor.g) && !isNaN(placeholderColor.b)) {
            placeholderText.fills = [{ type: 'SOLID', color: placeholderColor }];
          }
          placeholderText.x = 10;
          placeholderText.y = (node.height - placeholderText.height) / 2;
          node.appendChild(placeholderText);
        }
        
        if (parent) {
          parent.appendChild(node);
        } else {
          frame.appendChild(node);
        }
        break;
        
      case 'p':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'span':
      case 'label':
        if (element.textContent && element.textContent.trim()) {
          node = figma.createText();
          node.characters = element.textContent.trim();
          
          // Set font size based on tag
          var fontSizes = {
            'h1': 32,
            'h2': 28,
            'h3': 24,
            'h4': 20,
            'h5': 18,
            'h6': 16,
            'p': 14,
            'span': 14,
            'label': 14
          };
          
          node.fontSize = parseSize(elementStyles['font-size']) || fontSizes[tagName] || 14;
          
          // Apply text color
          if (elementStyles['color']) {
            var textColor = cssToRgb(elementStyles['color']);
            if (!isNaN(textColor.r) && !isNaN(textColor.g) && !isNaN(textColor.b)) {
              node.fills = [{ type: 'SOLID', color: textColor }];
            }
          }
          
          // Font weight
          if (elementStyles['font-weight'] === 'bold' || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(tagName) !== -1) {
            node.fontName = { family: "Inter", style: "Bold" };
          }
          
          node.x = 20;
          node.y = currentY;
          
          if (parent) {
            parent.appendChild(node);
          } else {
            frame.appendChild(node);
          }
        }
        break;
        
      case 'img':
        node = figma.createRectangle();
        node.name = element.alt || "Image";
        node.resize(
          parseSize(elementStyles['width']) || 200,
          parseSize(elementStyles['height']) || 150
        );
        node.x = 20;
        node.y = currentY;
        var imgBgColor = cssToRgb('#e0e0e0');
        if (!isNaN(imgBgColor.r) && !isNaN(imgBgColor.g) && !isNaN(imgBgColor.b)) {
          node.fills = [{ type: 'SOLID', color: imgBgColor }];
        }
        applyStylesToNode(node, elementStyles);
        
        // Add placeholder text for image
        var imgText = figma.createText();
        imgText.characters = element.alt || "Image Placeholder";
        imgText.fontSize = 12;
        var imgTextColor = cssToRgb('#666666');
        if (!isNaN(imgTextColor.r) && !isNaN(imgTextColor.g) && !isNaN(imgTextColor.b)) {
          imgText.fills = [{ type: 'SOLID', color: imgTextColor }];
        }
        imgText.x = node.x + (node.width - imgText.width) / 2;
        imgText.y = node.y + (node.height - imgText.height) / 2;
        
        if (parent) {
          parent.appendChild(node);
          parent.appendChild(imgText);
        } else {
          frame.appendChild(node);
          frame.appendChild(imgText);
        }
        break;
        
      default:
        // Process children for unknown elements
        var unknownChildren = toArray(element.children);
        unknownChildren.forEach(function(child) {
          currentY = createNodeFromElement(child, parent, currentY);
        });
        return currentY;
    }
    
    // Calculate next Y position
    if (node) {
      var margin = parseSize(elementStyles['margin-bottom']) || 20;
      currentY += node.height + margin;
    }
    
    return currentY;
  }
  
  // Process body children
  var body = doc.body;
  var yPos = 20;
  var bodyChildren = toArray(body.children);
  bodyChildren.forEach(function(child) {
    yPos = createNodeFromElement(child, null, yPos);
  });
  
  // Select and zoom to the created frame
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
  
  return frame;
}

// Handle messages from the UI
figma.ui.onmessage = function(msg) {
  // Handle resize request
  if (msg.type === 'resize-window') {
    if (msg.width && msg.height) {
      figma.ui.resize(msg.width, msg.height);
    }
    return;
  }
  
  if (msg.type === 'generate-design') {
    try {
      // Load fonts
      Promise.all([
        figma.loadFontAsync({ family: "Inter", style: "Regular" }),
        figma.loadFontAsync({ family: "Inter", style: "Bold" })
      ]).then(function() {
        // Create the design
        var frame = createDesignFromHTML(msg.html, msg.css);
        
        // Send success message
        figma.ui.postMessage({
          type: 'generation-complete',
          message: 'Design generated successfully!'
        });
      }).catch(function(error) {
        console.error('Error loading fonts:', error);
        figma.ui.postMessage({
          type: 'generation-error',
          message: 'Error loading fonts: ' + error.message
        });
      });
      
    } catch (error) {
      console.error('Error generating design:', error);
      figma.ui.postMessage({
        type: 'generation-error',
        message: 'Error generating design: ' + error.message
      });
    }
  }
  
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};

// Function to parse HTML string into DOM structure
function DOMParser() {
  this.parseFromString = function(htmlString, type) {
    // Simple HTML parser for basic elements
    var doc = {
      body: {
        children: [],
        tagName: 'BODY'
      }
    };
    
    // Remove scripts and comments
    htmlString = htmlString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    htmlString = htmlString.replace(/<!--[\s\S]*?-->/g, '');
    
    // Simple regex-based parser for basic HTML elements
    var elementRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>|<(\w+)([^>]*)\/>/g;
    var elements = [];
    
    // Parse root level elements
    var parseElement = function(html) {
      var element = {
        tagName: '',
        id: '',
        className: '',
        style: { cssText: '' },
        textContent: '',
        children: [],
        placeholder: '',
        alt: '',
        src: ''
      };
      
      // Match opening tag
      var tagMatch = html.match(/^<(\w+)([^>]*)>/);
      if (tagMatch) {
        element.tagName = tagMatch[1].toUpperCase();
        var attrs = tagMatch[2];
        
        // Parse attributes
        var idMatch = attrs.match(/id=["']([^"']+)["']/);
        if (idMatch) element.id = idMatch[1];
        
        var classMatch = attrs.match(/class=["']([^"']+)["']/);
        if (classMatch) element.className = classMatch[1];
        
        var styleMatch = attrs.match(/style=["']([^"']+)["']/);
        if (styleMatch) element.style.cssText = styleMatch[1];
        
        var placeholderMatch = attrs.match(/placeholder=["']([^"']+)["']/);
        if (placeholderMatch) element.placeholder = placeholderMatch[1];
        
        var altMatch = attrs.match(/alt=["']([^"']+)["']/);
        if (altMatch) element.alt = altMatch[1];
        
        // Get content between tags
        var contentRegex = new RegExp('^<' + element.tagName.toLowerCase() + '[^>]*>([\\s\\S]*?)<\\/' + element.tagName.toLowerCase() + '>');
        var contentMatch = html.match(contentRegex);
        if (contentMatch) {
          var content = contentMatch[1];
          // Check if content has nested tags
          if (/<\w+/.test(content)) {
            // Parse nested elements
            var nestedElements = content.match(/<\w+[^>]*>[\s\S]*?<\/\w+>|<\w+[^>]*\/>/g);
            if (nestedElements) {
              nestedElements.forEach(function(nestedHtml) {
                var child = parseElement(nestedHtml);
                if (child) element.children.push(child);
              });
            }
            // Get text content excluding nested tags
            element.textContent = content.replace(/<[^>]+>/g, '').trim();
          } else {
            element.textContent = content.trim();
          }
        }
      }
      
      return element;
    };
    
    // Find all root level elements
    var rootElements = htmlString.match(/<\w+[^>]*>[\s\S]*?<\/\w+>|<\w+[^>]*\/>/g);
    if (rootElements) {
      rootElements.forEach(function(elementHtml) {
        var element = parseElement(elementHtml);
        if (element) doc.body.children.push(element);
      });
    }
    
    return doc;
  };
}