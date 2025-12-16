package com.pruebatecnica.crudproductos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para representar una combinación de productos con su suma de precios.
 * Formato de salida: [nombre1, nombre2, ..., sumaPrecios]
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CombinacionProductosDTO {

    private List<String> productos;
    private BigDecimal sumaPrecios;

    /**
     * Retorna la combinación en el formato requerido: [nombre1, nombre2, suma]
     */
    public List<Object> toListFormat() {
        List<Object> resultado = new java.util.ArrayList<>(productos);
        resultado.add(sumaPrecios);
        return resultado;
    }
}
